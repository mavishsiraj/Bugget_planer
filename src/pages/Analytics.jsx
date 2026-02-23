import { motion } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORY_COLORS } from '@/types/budget';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const CHART_COLORS = ['#2DB5A3', '#E8705A', '#8B6FD8', '#E6C84D', '#34B87A', '#5A8FE6', '#D85A93', '#E6943A'];

const Analytics = () => {
    const { expenses, incomes, categorySpending, formatAmount, budgetGoals } = useBudget();

    const pieData = Object.entries(categorySpending).map(([name, value]) => ({
        name, value, color: CATEGORY_COLORS[name] || '#888',
    }));

    // Monthly trend (last 3 months mock)
    const trendData = [
        { month: 'Dec', expenses: 980, income: 5800 },
        { month: 'Jan', expenses: 1150, income: 6000 },
        { month: 'Feb', expenses: expenses.filter(e => e.date.startsWith('2026-02')).reduce((s, e) => s + e.amount, 0), income: incomes.filter(i => i.date.startsWith('2026-02')).reduce((s, i) => s + i.amount, 0) },
    ];

    // Budget usage
    const budgetData = budgetGoals.map(g => ({
        name: g.category.split(' ')[0],
        spent: categorySpending[g.category] || 0,
        limit: g.limit,
    }));

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                    className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart style={{ outline: 'none' }}>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}>
                                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip formatter={(value) => formatAmount(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : <p className="text-muted-foreground py-20 text-center">No data yet</p>}
                </motion.div>

                {/* Monthly Trend */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                    className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={trendData} style={{ outline: 'none' }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip formatter={(value) => formatAmount(value)} />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#2DB5A3" strokeWidth={3} dot={{ r: 5 }} />
                            <Line type="monotone" dataKey="expenses" stroke="#E8705A" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Income vs Expense */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={trendData} style={{ outline: 'none' }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip formatter={(value) => formatAmount(value)} />
                            <Legend />
                            <Bar dataKey="income" fill="#2DB5A3" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="expenses" fill="#E8705A" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Budget Usage */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Budget Usage</h2>
                    {budgetData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={budgetData} layout="vertical" style={{ outline: 'none' }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={120} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value) => formatAmount(value)} />
                                <Legend />
                                <Bar dataKey="limit" fill="#64B5CD" radius={[0, 8, 8, 0]} name="Budget" />
                                <Bar dataKey="spent" fill="#8B6FD8" radius={[0, 8, 8, 0]} name="Spent" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <p className="text-muted-foreground py-20 text-center">Set budget goals to see usage</p>}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Analytics;
