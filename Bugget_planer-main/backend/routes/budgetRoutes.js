const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  setBudget,
  getCurrentBudget
} = require("../controller/budgetController");

router.post("/set", auth, setBudget);
router.get("/current", auth, getCurrentBudget);

module.exports = router;
