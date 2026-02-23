import { motion } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/types/budget';
import { TrendingUp, TrendingDown, Wallet, CreditCard, PiggyBank, Sparkles, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { formatAmount, totalIncome, totalExpenses, balance, categorySpending, expenses } = useBudget();
    const navigate = useNavigate();
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0';

    const pieData = Object.entries(categorySpending).map(([name, value]) => ({
        name, value, color: CATEGORY_COLORS[name] || '#888',
    }));

    const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    const recentExpenses = expenses.slice(0, 5);

    const insights = [
        topCategory && `Your top spending is **${topCategory[0]}** at ${formatAmount(topCategory[1])} this month.`,
        balance > 0 ? `You're saving ${savingsRate}% of your income. Keep it up! 🎉` : `⚠️ You're overspending by ${formatAmount(Math.abs(balance))}. Consider cutting back.`,
        topCategory && topCategory[1] > 300 ? `💡 Try reducing ${topCategory[0]} expenses — you've spent over ${formatAmount(300)}.` : '✨ Your spending looks well-balanced this month!',
    ].filter(Boolean);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="text-center mb-8">
                <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
                <h1 className="text-5xl font-bold tracking-tight text-gradient">{formatAmount(balance)}</h1>
                <p className="text-muted-foreground text-sm mt-2">February 2026</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-income flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Income</p>
                        <p className="text-xl font-semibold text-income">{formatAmount(totalIncome)}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-expense flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Expenses</p>
                        <p className="text-xl font-semibold text-expense">{formatAmount(totalExpenses)}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <PiggyBank className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Savings Rate</p>
                        <p className="text-xl font-semibold text-primary">{savingsRate}%</p>
                    </div>
                </motion.div>
            </div>

            {/* AI Insights + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-semibold">AI Insights</h2>
                    </div>
                    <div className="space-y-3">
                        {insights.map((insight, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">{insight}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                    className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Spending Breakdown</h2>
                    {pieData.length > 0 ? (
                        <div className="flex items-center gap-4">
                            <div className="w-40 h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart style={{ outline: 'none' }}>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={3} dataKey="value" style={{ outline: 'none' }}>
                                            {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-2">
                                {pieData.slice(0, 5).map(d => (
                                    <div key={d.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                                            <span className="text-muted-foreground">{d.name}</span>
                                        </div>
                                        <span className="font-medium">{formatAmount(d.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">No expenses yet this month.</p>
                    )}
                </motion.div>
            </div>

            {/* Recent Expenses */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Expenses</h2>
                    <button onClick={() => navigate('/expenses')} className="text-sm text-primary flex items-center gap-1 hover:underline">
                        View all <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                <div className="space-y-3">
                    {recentExpenses.map(e => (
                        <div key={e.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{CATEGORY_ICONS[e.category]}</span>
                                <div>
                                    <p className="text-sm font-medium">{e.note}</p>
                                    <p className="text-xs text-muted-foreground">{e.category} · {e.date}</p>
                                </div>
                            </div>
                            <span className="font-semibold text-expense">-{formatAmount(e.amount)}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
