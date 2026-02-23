import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Income() {
  const [incomeList, setIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0]
  });
  const [loading, setLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);

  const incomeSources = [
    "Salary",
    "Freelance",
    "Investment",
    "Bonus",
    "Gifts",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!formData.source || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Creating local income object since backend might not have full income endpoints
      const incomeItem = {
        source: formData.source,
        amount: parseFloat(formData.amount),
        date: formData.date,
        id: Date.now()
      };

      setIncomeList([...incomeList, incomeItem]);
      setTotalIncome(totalIncome + parseFloat(formData.amount));
      setFormData({
        source: "",
        amount: "",
        date: new Date().toISOString().split("T")[0]
      });
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-section" style={{ minHeight: "calc(100vh - 90px)" }}>
      <h1 className="page-title">💵 Track Income</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Form Section */}
        <div style={{ backgroundColor: "#242424", padding: "40px", borderRadius: "8px", border: "1px solid #333333" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "24px" }}>Add New Income</h2>
          
          <form onSubmit={handleAddIncome}>
            <div className="form-group">
              <label>Income Source *</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a source</option>
                {incomeSources.map(src => (
                  <option key={src} value={src}>{src}</option>
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
                backgroundColor: loading ? "#666" : "#2fa46a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {loading ? "Adding..." : "Add Income"}
            </button>
          </form>
        </div>

        {/* Stats & List Section */}
        <div>
          <div className="stats-grid" style={{ gridTemplateColumns: "1fr", marginBottom: "30px" }}>
            <div className="stat-card">
              <h3>Total Income</h3>
              <div className="value" style={{ color: "#2fa46a" }}>
                ${totalIncome.toFixed(2)}
              </div>
              <div style={{ fontSize: "12px", color: "#b0b0b0", marginTop: "8px" }}>
                {incomeList.length} source(s)
              </div>
            </div>
          </div>

          {incomeList.length > 0 && (
            <div style={{ backgroundColor: "#242424", padding: "24px", borderRadius: "8px", border: "1px solid #333333" }}>
              <h3 style={{ color: "#d4af37", marginBottom: "16px" }}>Recent Income</h3>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {incomeList.map((income) => (
                  <div
                    key={income.id}
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
                        {income.source}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {income.date}
                      </div>
                    </div>
                    <div style={{ color: "#2fa46a", fontWeight: "700" }}>
                      +${income.amount.toFixed(2)}
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