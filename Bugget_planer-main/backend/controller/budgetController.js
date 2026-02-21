const Budget = require("../models/Budget");

exports.setBudget = async (req, res) => {
  try {
    const { month, year, totalBudget } = req.body;

    const existing = await Budget.findOne({
      user: req.userId,
      month,
      year
    });

    if (existing) {
      return res.status(400).json({ message: "Budget already exists" });
    }

    const budget = await Budget.create({
      user: req.userId,
      month,
      year,
      totalBudget,
      remainingBudget: totalBudget
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentBudget = async (req, res) => {
  try {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({
      user: req.userId,
      month,
      year
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not set" });
    }

    res.json({
      total: budget.totalBudget,
      remaining: budget.remainingBudget,
      spent: budget.totalBudget - budget.remainingBudget
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
