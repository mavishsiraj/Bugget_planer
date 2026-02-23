import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { Plus, Trash2, TrendingUp, Wallet, Briefcase, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const SOURCE_ICONS = {
    Salary: <Briefcase className="w-5 h-5" />,
    Freelance: <BarChart3 className="w-5 h-5" />,
    Investments: <TrendingUp className="w-5 h-5" />,
    Other: <Wallet className="w-5 h-5" />,
};

// Color palette cycling for income sources
const SOURCE_COLORS = {
    Salary: '#5A8FE6',  // blue
    Freelance: '#8B6FD8',  // violet
    Investments: '#E6943A',  // amber
    Other: '#2DB5A3',  // teal
};
const FALLBACK_COLORS = ['#E8705A', '#34B87A', '#D85A93', '#64B5CD', '#A3C96B'];
const getColor = (source, idx) => SOURCE_COLORS[source] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];

const IncomePage = () => {
    const { incomes, addIncome, deleteIncome, formatAmount, totalIncome, currency } = useBudget();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({ amount: '', source: '', date: new Date().toISOString().split('T')[0], note: '' });

    const handleSubmit = () => {
        if (!form.amount || !form.source) { toast.error('Please fill required fields'); return; }
        addIncome({ ...form, amount: parseFloat(form.amount), currency });
        toast.success('Income added');
        setDialogOpen(false);
        setForm({ amount: '', source: '', date: new Date().toISOString().split('T')[0], note: '' });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Income</h1>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-full gap-2"><Plus className="w-4 h-4" /> Add Income</Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-0">
                        <DialogHeader><DialogTitle>Add Income</DialogTitle></DialogHeader>
                        <div className="space-y-4 pt-4">
                            <Input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="rounded-xl" />
                            <Input placeholder="Source (e.g. Salary, Freelance)" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className="rounded-xl" />
                            <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="rounded-xl" />
                            <Input placeholder="Note (optional)" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} className="rounded-xl" />
                            <Button onClick={handleSubmit} className="w-full rounded-full">Add Income</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Total Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card p-6 gradient-income text-primary-foreground">
                <p className="text-sm opacity-80">Total Monthly Income</p>
                <p className="text-4xl font-bold mt-1">{formatAmount(totalIncome)}</p>
                <p className="text-sm opacity-70 mt-2">{incomes.filter(i => i.date.startsWith('2026-02')).length} sources this month</p>
            </motion.div>

            {/* Income List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {incomes.map((i, idx) => {
                        const color = getColor(i.source, idx);
                        return (
                            <motion.div key={i.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                                className="glass-card p-4 flex items-center justify-between group border-l-[6px]"
                                style={{ borderLeftColor: color }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${color}22`, color }}>
                                        {SOURCE_ICONS[i.source] || SOURCE_ICONS.Other}
                                    </div>
                                    <div>
                                        <p className="font-medium">{i.source}</p>
                                        <p className="text-xs text-muted-foreground">{i.note && `${i.note} · `}{i.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-lg" style={{ color }}>+{formatAmount(i.amount)}</span>
                                    <button onClick={() => { deleteIncome(i.id); toast.success('Deleted'); }} className="p-2 rounded-full hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {incomes.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Wallet className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No income recorded yet.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default IncomePage;
