const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({
      user: req.userId,
      month,
      year
    });

    if (!budget) {
      return res.status(400).json({ message: "Set budget first" });
    }

    if (amount > budget.remainingBudget) {
      return res.status(400).json({ message: "Budget exceeded" });
    }

    const expense = await Expense.create({
      user: req.userId,
      budget: budget._id,
      amount,
      category,
      description,
      date
    });

    budget.remainingBudget -= amount;
    await budget.save();

    res.status(201).json({
      expense,
      remainingBudget: budget.remainingBudget
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
