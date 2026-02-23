const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addExpense } = require("../controller/expenseController");

router.post("/add", auth, addExpense);

module.exports = router;
