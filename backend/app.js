const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Budget Planner API Running ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
