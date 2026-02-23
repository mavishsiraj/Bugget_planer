import { useState, useEffect } from "react";

export default function Summary() {
  const [summary, setSummary] = useState({
    totalIncome: 5500,
    totalExpenses: 2100,
    balance: 3400,
    budgetLimit: 4000,
    topExpenseCategory: "Food",
    topExpenseAmount: 620
  });

  const balancePercentage = (summary.balance / summary.budgetLimit) * 100;
  const budgetUsage = ((summary.totalExpenses / summary.budgetLimit) * 100).toFixed(1);

  return (
    <div className="page-section" style={{ minHeight: "calc(100vh - 90px)" }}>
      <h1 className="page-title">📊 Financial Summary</h1>

      {/* Main Stats Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: "40px" }}>
        {/* Income Card */}
        <div className="stat-card">
          <h3>Total Income</h3>
          <div className="value" style={{ color: "#2fa46a" }}>
            ${summary.totalIncome.toFixed(2)}
          </div>
          <p style={{ fontSize: "12px", color: "#b0b0b0", margin: "8px 0 0 0" }}>
            This month
          </p>
        </div>

        {/* Expenses Card */}
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <div className="value" style={{ color: "#f26d5b" }}>
            ${summary.totalExpenses.toFixed(2)}
          </div>
          <p style={{ fontSize: "12px", color: "#b0b0b0", margin: "8px 0 0 0" }}>
            This month
          </p>
        </div>

        {/* Balance Card */}
        <div className="stat-card">
          <h3>Available Balance</h3>
          <div className="value" style={{ color: "#d4af37" }}>
            ${summary.balance.toFixed(2)}
          </div>
          <div style={{ fontSize: "12px", color: "#2fa46a", marginTop: "8px" }}>
            ✓ {balancePercentage.toFixed(0)}% remaining
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Budget Usage */}
        <div style={{ backgroundColor: "#242424", padding: "30px", borderRadius: "8px", border: "1px solid #333333" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "24px", fontSize: "20px" }}>Budget Usage</h2>
          
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#b0b0b0", fontSize: "14px" }}>Monthly Budget Limit</span>
              <span style={{ color: "#d4af37", fontWeight: "700" }}>
                ${summary.budgetLimit.toFixed(2)}
              </span>
            </div>
            <div style={{
              width: "100%",
              height: "12px",
              backgroundColor: "#1a1a1a",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid #333333"
            }}>
              <div style={{
                width: `${Math.min(budgetUsage, 100)}%`,
                height: "100%",
                backgroundColor: budgetUsage > 80 ? "#f26d5b" : "#d4af37",
                transition: "width 0.3s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#888" }}>
              <span>{budgetUsage}% used</span>
              <span>{(100 - budgetUsage).toFixed(1)}% remaining</span>
            </div>
          </div>
        </div>

        {/* Top Expenses */}
        <div style={{ backgroundColor: "#242424", padding: "30px", borderRadius: "8px", border: "1px solid #333333" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "24px", fontSize: "20px" }}>Top Expense Category</h2>
          
          <div style={{
            padding: "20px",
            backgroundColor: "#2a2a2a",
            borderRadius: "6px",
            border: "1px solid #333333"
          }}>
            <div style={{ color: "#b0b0b0", fontSize: "14px", marginBottom: "8px" }}>
              {summary.topExpenseCategory}
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#d4af37" }}>
              ${summary.topExpenseAmount.toFixed(2)}
            </div>
            <div style={{ color: "#f26d5b", fontSize: "12px", marginTop: "8px" }}>
              ↑ 12% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div style={{ marginTop: "40px", backgroundColor: "#242424", padding: "30px", borderRadius: "8px", border: "1px solid #333333" }}>
        <h2 style={{ color: "#d4af37", marginBottom: "24px", fontSize: "20px" }}>Expense Breakdown</h2>
        
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #d4af37" }}>
              <th style={{ color: "#d4af37", padding: "12px", textAlign: "left", fontWeight: "700" }}>Category</th>
              <th style={{ color: "#d4af37", padding: "12px", textAlign: "right", fontWeight: "700" }}>Amount</th>
              <th style={{ color: "#d4af37", padding: "12px", textAlign: "right", fontWeight: "700" }}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {[
              { category: "Food & Dining", amount: 620, percentage: 29.5 },
              { category: "Transportation", amount: 450, percentage: 21.4 },
              { category: "Entertainment", amount: 380, percentage: 18.1 },
              { category: "Bills & Utilities", amount: 420, percentage: 20 },
              { category: "Shopping", amount: 230, percentage: 11 }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #333333" }}>
                <td style={{ color: "#b0b0b0", padding: "12px", textAlign: "left" }}>
                  {row.category}
                </td>
                <td style={{ color: "#d4af37", padding: "12px", textAlign: "right", fontWeight: "600" }}>
                  ${row.amount.toFixed(2)}
                </td>
                <td style={{ color: "#888", padding: "12px", textAlign: "right", fontSize: "12px" }}>
                  {row.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Month Info */}
      <div style={{ marginTop: "40px", padding: "24px", backgroundColor: "#2a2a2a", borderRadius: "8px", border: "1px solid #333333", textAlign: "center" }}>
        <p style={{ color: "#b0b0b0", margin: "0" }}>
          Generated on {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}