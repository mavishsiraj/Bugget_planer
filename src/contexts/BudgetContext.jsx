import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CURRENCIES } from '@/types/budget';

const BudgetContext = createContext(null);

const uid = () => Math.random().toString(36).slice(2, 10);

const DEMO_EXPENSES = [
    { id: uid(), amount: 85.50, category: 'Food & Dining', date: '2026-02-20', note: 'Grocery shopping', currency: 'USD' },
    { id: uid(), amount: 42.00, category: 'Transportation', date: '2026-02-19', note: 'Uber rides', currency: 'USD' },
    { id: uid(), amount: 15.99, category: 'Entertainment', date: '2026-02-18', note: 'Netflix subscription', currency: 'USD' },
    { id: uid(), amount: 230.00, category: 'Shopping', date: '2026-02-17', note: 'New headphones', currency: 'USD' },
    { id: uid(), amount: 65.00, category: 'Health', date: '2026-02-15', note: 'Pharmacy', currency: 'USD' },
    { id: uid(), amount: 150.00, category: 'Bills & Utilities', date: '2026-02-14', note: 'Electric bill', currency: 'USD' },
    { id: uid(), amount: 49.99, category: 'Education', date: '2026-02-12', note: 'Online course', currency: 'USD' },
    { id: uid(), amount: 320.00, category: 'Travel', date: '2026-02-10', note: 'Weekend getaway hotel', currency: 'USD' },
    { id: uid(), amount: 38.50, category: 'Food & Dining', date: '2026-02-08', note: 'Restaurant dinner', currency: 'USD' },
    { id: uid(), amount: 25.00, category: 'Transportation', date: '2026-02-05', note: 'Gas station', currency: 'USD' },
    { id: uid(), amount: 95.00, category: 'Shopping', date: '2026-02-03', note: 'Clothing', currency: 'USD' },
    { id: uid(), amount: 120.00, category: 'Bills & Utilities', date: '2026-02-01', note: 'Internet bill', currency: 'USD' },
    { id: uid(), amount: 75.00, category: 'Food & Dining', date: '2026-01-28', note: 'Meal delivery', currency: 'USD' },
    { id: uid(), amount: 200.00, category: 'Shopping', date: '2026-01-25', note: 'Electronics', currency: 'USD' },
    { id: uid(), amount: 55.00, category: 'Entertainment', date: '2026-01-20', note: 'Concert tickets', currency: 'USD' },
];

const DEMO_INCOMES = [
    { id: uid(), amount: 5200, source: 'Salary', date: '2026-02-01', note: 'Monthly salary', currency: 'USD' },
    { id: uid(), amount: 800, source: 'Freelance', date: '2026-02-10', note: 'Design project', currency: 'USD' },
    { id: uid(), amount: 150, source: 'Investments', date: '2026-02-15', note: 'Dividend payment', currency: 'USD' },
];

const DEMO_GOALS = [
    { id: uid(), category: 'Food & Dining', limit: 400, currency: 'USD' },
    { id: uid(), category: 'Transportation', limit: 200, currency: 'USD' },
    { id: uid(), category: 'Entertainment', limit: 100, currency: 'USD' },
    { id: uid(), category: 'Shopping', limit: 500, currency: 'USD' },
    { id: uid(), category: 'Bills & Utilities', limit: 350, currency: 'USD' },
];

export const BudgetProvider = ({ children }) => {
    const [expenses, setExpenses] = useState(DEMO_EXPENSES);
    const [incomes, setIncomes] = useState(DEMO_INCOMES);
    const [budgetGoals, setBudgetGoals] = useState(DEMO_GOALS);
    const [currency, setCurrency] = useState('USD');

    const formatAmount = useCallback((amount) => {
        const { symbol } = CURRENCIES[currency];
        return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }, [currency]);

    const addExpense = useCallback((e) => {
        setExpenses(prev => [{ ...e, id: uid() }, ...prev]);
    }, []);
    const updateExpense = useCallback((id, updates) => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    }, []);
    const deleteExpense = useCallback((id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    }, []);
    const addIncome = useCallback((i) => {
        setIncomes(prev => [{ ...i, id: uid() }, ...prev]);
    }, []);
    const deleteIncome = useCallback((id) => {
        setIncomes(prev => prev.filter(i => i.id !== id));
    }, []);
    const addBudgetGoal = useCallback((g) => {
        setBudgetGoals(prev => [...prev, { ...g, id: uid() }]);
    }, []);
    const updateBudgetGoal = useCallback((id, updates) => {
        setBudgetGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    }, []);
    const deleteBudgetGoal = useCallback((id) => {
        setBudgetGoals(prev => prev.filter(g => g.id !== id));
    }, []);

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const monthlyExpenses = useMemo(() => expenses.filter(e => e.date.startsWith(currentMonth)), [expenses, currentMonth]);
    const monthlyIncomes = useMemo(() => incomes.filter(i => i.date.startsWith(currentMonth)), [incomes, currentMonth]);

    const totalExpenses = useMemo(() => monthlyExpenses.reduce((s, e) => s + e.amount, 0), [monthlyExpenses]);
    const totalIncome = useMemo(() => monthlyIncomes.reduce((s, i) => s + i.amount, 0), [monthlyIncomes]);
    const balance = totalIncome - totalExpenses;

    const categorySpending = useMemo(() => {
        const map = {};
        monthlyExpenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
        return map;
    }, [monthlyExpenses]);

    return (
        <BudgetContext.Provider value={{
            expenses, incomes, budgetGoals, currency, setCurrency,
            addExpense, updateExpense, deleteExpense,
            addIncome, deleteIncome,
            addBudgetGoal, updateBudgetGoal, deleteBudgetGoal,
            formatAmount, totalIncome, totalExpenses, balance, categorySpending,
        }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const ctx = useContext(BudgetContext);
    if (!ctx) throw new Error('useBudget must be used within BudgetProvider');
    return ctx;
};
