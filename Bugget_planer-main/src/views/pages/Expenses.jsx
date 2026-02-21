import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });
  const [loading, setLoading] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const expenseCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/expense/add`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setExpenses([...expenses, response.data]);
        setTotalExpenses(totalExpenses + parseFloat(formData.amount));
        setFormData({
          category: "",
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0]
        });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-section" style={{ minHeight: "calc(100vh - 90px)" }}>
      <h1 className="page-title">💰 Track Expenses</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Form Section */}
        <div style={{ backgroundColor: "#242424", padding: "40px", borderRadius: "8px", border: "1px solid #333333" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "24px" }}>Add New Expense</h2>
          
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {expenseCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Amount ($) *</label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Add a note (optional)"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: loading ? "#666" : "#d4af37",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "6px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </form>
        </div>

        {/* Stats & List Section */}
        <div>
          <div className="stats-grid" style={{ gridTemplateColumns: "1fr", marginBottom: "30px" }}>
            <div className="stat-card">
              <h3>Total Expenses</h3>
              <div className="value">${totalExpenses.toFixed(2)}</div>
              <div style={{ fontSize: "12px", color: "#b0b0b0", marginTop: "8px" }}>
                {expenses.length} transaction(s)
              </div>
            </div>
          </div>

          {expenses.length > 0 && (
            <div style={{ backgroundColor: "#242424", padding: "24px", borderRadius: "8px", border: "1px solid #333333" }}>
              <h3 style={{ color: "#d4af37", marginBottom: "16px" }}>Recent Expenses</h3>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {expenses.map((expense, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                      borderBottom: "1px solid #333333",
                      color: "#b0b0b0"
                    }}
                  >
                    <div>
                      <div style={{ color: "#d4af37", fontWeight: "600" }}>
                        {expense.category}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {expense.date || expense.description}
                      </div>
                    </div>
                    <div style={{ color: "#f26d5b", fontWeight: "700" }}>
                      -${typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}