import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } from '@/types/budget';
import { Plus, Trash2, Edit2, X, Upload, CreditCard, Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Expenses = () => {
    const { expenses, addExpense, updateExpense, deleteExpense, formatAmount, currency, budgetGoals, categorySpending } = useBudget();
    const [filter, setFilter] = useState('All');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ amount: '', category: 'Food & Dining', date: new Date().toISOString().split('T')[0], note: '' });
    const [showInsights, setShowInsights] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter);

    const handleSubmit = () => {
        if (!form.amount || !form.note) { toast.error('Please fill all fields'); return; }
        if (editId) {
            updateExpense(editId, { ...form, amount: parseFloat(form.amount) });
            toast.success('Expense updated');
        } else {
            addExpense({ ...form, amount: parseFloat(form.amount), currency });
            toast.success('Expense added');
        }
        setDialogOpen(false);
        setEditId(null);
        setForm({ amount: '', category: 'Food & Dining', date: new Date().toISOString().split('T')[0], note: '' });
    };

    const openEdit = (e) => {
        setEditId(e.id);
        setForm({ amount: String(e.amount), category: e.category, date: e.date, note: e.note });
        setDialogOpen(true);
    };

    // AI Insights generation
    const insights = useMemo(() => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const monthlyExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
        const totalMonthly = monthlyExpenses.reduce((s, e) => s + e.amount, 0);

        const catTotals = {};
        monthlyExpenses.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });

        const results = [];

        // Overspending warnings
        budgetGoals.forEach(g => {
            const spent = catTotals[g.category] || 0;
            const pct = g.limit > 0 ? (spent / g.limit) * 100 : 0;
            if (pct >= 100) {
                results.push({ type: 'warning', icon: <AlertTriangle className="w-5 h-5" />, title: `${CATEGORY_ICONS[g.category]} ${g.category} Over Budget!`, description: `You've spent ${formatAmount(spent)} of your ${formatAmount(g.limit)} budget (${Math.round(pct)}%). Consider cutting back.`, color: 'text-destructive' });
            } else if (pct >= 80) {
                results.push({ type: 'warning', icon: <TrendingUp className="w-5 h-5" />, title: `${CATEGORY_ICONS[g.category]} ${g.category} Nearing Limit`, description: `You've used ${Math.round(pct)}% of your ${g.category} budget (${formatAmount(spent)} / ${formatAmount(g.limit)}). Be cautious!`, color: 'text-amber-500' });
            }
        });

        // Top spending category
        const sorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 0) {
            const [topCat, topAmt] = sorted[0];
            const pctOfTotal = totalMonthly > 0 ? Math.round((topAmt / totalMonthly) * 100) : 0;
            results.push({ type: 'pattern', icon: <BarChart3 className="w-5 h-5" />, title: `Top Spending: ${topCat}`, description: `${topCat} accounts for ${pctOfTotal}% of your monthly spending (${formatAmount(topAmt)}).`, color: 'text-primary' });
        }

        // Unusual single expense
        const avgExpense = monthlyExpenses.length > 0 ? totalMonthly / monthlyExpenses.length : 0;
        const outliers = monthlyExpenses.filter(e => e.amount > avgExpense * 2.5);
        outliers.forEach(o => {
            results.push({ type: 'pattern', icon: <TrendingDown className="w-5 h-5" />, title: `Unusual Expense Detected`, description: `"${o.note}" (${formatAmount(o.amount)}) is significantly higher than your average expense of ${formatAmount(avgExpense)}.`, color: 'text-orange-500' });
        });

        // Saving suggestions
        if (sorted.length >= 2) {
            results.push({ type: 'tip', icon: <Lightbulb className="w-5 h-5" />, title: 'Saving Suggestion', description: `Try reducing ${sorted[0][0]} spending by 15% — that could save you ${formatAmount(sorted[0][1] * 0.15)} this month.`, color: 'text-emerald-500' });
        }

        if (totalMonthly > 0) {
            const dailyAvg = totalMonthly / now.getDate();
            const projected = dailyAvg * new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            results.push({ type: 'tip', icon: <TrendingUp className="w-5 h-5" />, title: 'Projected Monthly Spend', description: `At your current pace, you'll spend ~${formatAmount(projected)} this month. ${projected > totalMonthly * 1.2 ? 'Consider slowing down!' : 'Looking good!'}`, color: 'text-primary' });
        }

        return results;
    }, [expenses, budgetGoals, formatAmount]);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setShowInsights(true);
            toast.success('AI analysis complete!');
        }, 1200);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <div className="flex gap-2">
                    <Button onClick={handleAnalyze} variant="outline" className="rounded-full gap-2 border-primary/30 hover:bg-primary/10" disabled={analyzing}>
                        <Sparkles className={`w-4 h-4 text-primary ${analyzing ? 'animate-spin' : ''}`} />
                        {analyzing ? 'Analyzing...' : 'AI Analyze'}
                    </Button>
                    <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditId(null); }}>
                        <DialogTrigger asChild>
                            <Button className="rounded-full gap-2"><Plus className="w-4 h-4" /> Add Expense</Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card border-0">
                            <DialogHeader>
                                <DialogTitle>{editId ? 'Edit' : 'Add'} Expense</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <Input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="rounded-xl" />
                                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{CATEGORY_ICONS[c]} {c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="rounded-xl" />
                                <Input placeholder="Note" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} className="rounded-xl" />
                                <Button onClick={handleSubmit} className="w-full rounded-full">{editId ? 'Update' : 'Add'} Expense</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* AI Insights Panel */}
            <AnimatePresence>
                {showInsights && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <div className="glass-card p-5 space-y-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                            <div className="flex items-center justify-between relative">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-lg font-semibold">AI Spending Insights</h2>
                                </div>
                                <button onClick={() => setShowInsights(false)} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 relative">
                                {insights.map((insight, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex gap-3 p-3 rounded-xl bg-background/60 border border-border/50 hover:border-primary/20 transition-colors"
                                    >
                                        <div className={`mt-0.5 ${insight.color} shrink-0`}>{insight.icon}</div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm">{insight.title}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{insight.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {insights.length === 0 && (
                                    <p className="text-sm text-muted-foreground col-span-2 text-center py-4">Not enough data to generate insights yet. Add more expenses!</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                    All
                </button>
                {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                        {CATEGORY_ICONS[c]} {c}
                    </button>
                ))}
            </div>

            {/* Expense List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filtered.map(e => (
                        <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                            className="glass-card p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{CATEGORY_ICONS[e.category]}</span>
                                <div>
                                    <p className="font-medium">{e.note}</p>
                                    <p className="text-xs text-muted-foreground">{e.category} · {e.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-expense">-{formatAmount(e.amount)}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(e)} className="p-2 rounded-full hover:bg-secondary"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                                    <button onClick={() => { deleteExpense(e.id); toast.success('Deleted'); }} className="p-2 rounded-full hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No expenses found. Add your first expense!</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Expenses;
