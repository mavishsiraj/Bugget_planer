import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } from '@/types/budget';
import { Plus, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const BudgetGoals = () => {
    const { budgetGoals, addBudgetGoal, updateBudgetGoal, deleteBudgetGoal, categorySpending, formatAmount, currency } = useBudget();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({ category: 'Food & Dining', limit: '' });

    const handleSubmit = () => {
        if (!form.limit) { toast.error('Set a budget limit'); return; }
        const existing = budgetGoals.find(g => g.category === form.category);
        if (existing) {
            updateBudgetGoal(existing.id, { limit: parseFloat(form.limit) });
            toast.success('Budget updated');
        } else {
            addBudgetGoal({ category: form.category, limit: parseFloat(form.limit), currency });
            toast.success('Budget goal added');
        }
        setDialogOpen(false);
        setForm({ category: 'Food & Dining', limit: '' });
    };

    const availableCategories = CATEGORIES.filter(c => !budgetGoals.find(g => g.category === c));

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Budget Goals</h1>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-full gap-2" disabled={availableCategories.length === 0}>
                            <Plus className="w-4 h-4" /> Add Goal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-0">
                        <DialogHeader><DialogTitle>Set Budget Goal</DialogTitle></DialogHeader>
                        <div className="space-y-4 pt-4">
                            <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {availableCategories.map(c => <SelectItem key={c} value={c}>{CATEGORY_ICONS[c]} {c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Input type="number" placeholder="Monthly limit" value={form.limit} onChange={e => setForm(f => ({ ...f, limit: e.target.value }))} className="rounded-xl" />
                            <Button onClick={handleSubmit} className="w-full rounded-full">Set Goal</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetGoals.map((goal, i) => {
                    const spent = categorySpending[goal.category] || 0;
                    const pct = Math.min((spent / goal.limit) * 100, 100);
                    const remaining = goal.limit - spent;
                    const isOver = spent > goal.limit;
                    const isNear = pct >= 80 && !isOver;

                    return (
                        <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-card p-5 border-l-[6px] overflow-hidden relative"
                            style={{ borderLeftColor: CATEGORY_COLORS[goal.category] }}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{ backgroundColor: `${CATEGORY_COLORS[goal.category]}22` }}>
                                        {CATEGORY_ICONS[goal.category]}
                                    </div>
                                    <h3 className="font-semibold">{goal.category}</h3>
                                </div>
                                {isOver ? <AlertTriangle className="w-5 h-5 text-destructive" /> :
                                    isNear ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> :
                                        <CheckCircle className="w-5 h-5 text-income" />}
                            </div>

                            {/* Custom colored progress bar */}
                            <div className="mb-2 h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${pct}%`,
                                        backgroundColor: isOver ? '#ef4444' : CATEGORY_COLORS[goal.category],
                                        boxShadow: `0 0 8px ${CATEGORY_COLORS[goal.category]}80`,
                                    }}
                                />
                            </div>

                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-muted-foreground">{formatAmount(spent)} of {formatAmount(goal.limit)}</span>
                                <span className="font-semibold" style={{ color: isOver ? '#ef4444' : CATEGORY_COLORS[goal.category] }}>
                                    {isOver ? `Over by ${formatAmount(Math.abs(remaining))}` : `${formatAmount(remaining)} left`}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {budgetGoals.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No budget goals set. Start by adding a monthly budget for a category!</p>
                </div>
            )}
        </motion.div>
    );
};

export default BudgetGoals;
