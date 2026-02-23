import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORY_ICONS } from '@/types/budget';
import { Send, Bot, User, Sparkles, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
    { label: "What's my biggest expense?", icon: "🏆" },
    { label: "How much have I saved this month?", icon: "💰" },
    { label: "Can you analyze my spending?", icon: "📊" },
    { label: "Suggest ways to reduce expenses", icon: "💡" },
];

const AIChat = () => {
    const { expenses, incomes, totalIncome, totalExpenses, balance, categorySpending, formatAmount, budgetGoals } = useBudget();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! 👋 I'm your AI financial assistant. I can help you analyze your spending, income, and budget. Ask me anything about your finances!" },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const generateResponse = (question) => {
        const q = question.toLowerCase();
        const topCat = Object.entries(categorySpending).sort((a, b) => b[1] - a[1]);
        const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0';

        if (q.includes('biggest') || q.includes('top') || q.includes('most')) {
            if (topCat.length > 0) {
                return `Your biggest expense category is **${topCat[0][0]}** ${CATEGORY_ICONS[topCat[0][0]]} at **${formatAmount(topCat[0][1])}** this month.\n\nHere's your full breakdown:\n${topCat.map(([cat, amt], i) => `${i + 1}. ${CATEGORY_ICONS[cat]} **${cat}**: ${formatAmount(amt)}`).join('\n')}`;
            }
            return "You don't have any expenses recorded yet. Start tracking to get insights!";
        }

        if (q.includes('save') || q.includes('saving')) {
            return `## 💰 Savings Summary\n\n- **Total Income**: ${formatAmount(totalIncome)}\n- **Total Expenses**: ${formatAmount(totalExpenses)}\n- **Balance**: ${formatAmount(balance)}\n- **Savings Rate**: ${savingsRate}%\n\n${parseFloat(savingsRate) >= 20 ? "🎉 Great job! You're saving over 20% of your income!" : parseFloat(savingsRate) > 0 ? "💡 Try to aim for saving at least 20% of your income." : "⚠️ You're spending more than you earn. Consider cutting back on non-essentials."}`;
        }

        if (q.includes('analyz') || q.includes('overview') || q.includes('summary')) {
            let response = `## 📊 Financial Overview\n\n### Income & Expenses\n- Monthly Income: **${formatAmount(totalIncome)}**\n- Monthly Expenses: **${formatAmount(totalExpenses)}**\n- Net Balance: **${formatAmount(balance)}**\n- Savings Rate: **${savingsRate}%**\n\n`;
            if (topCat.length > 0) {
                response += `### Top Spending Categories\n${topCat.slice(0, 5).map(([cat, amt]) => `- ${CATEGORY_ICONS[cat]} **${cat}**: ${formatAmount(amt)}`).join('\n')}\n\n`;
            }
            if (budgetGoals.length > 0) {
                response += `### Budget Status\n`;
                budgetGoals.forEach(g => {
                    const spent = categorySpending[g.category] || 0;
                    const pct = Math.round((spent / g.limit) * 100);
                    response += `- ${CATEGORY_ICONS[g.category]} **${g.category}**: ${formatAmount(spent)} / ${formatAmount(g.limit)} (${pct}%) ${pct >= 100 ? '🔴' : pct >= 80 ? '🟡' : '🟢'}\n`;
                });
            }
            return response;
        }

        if (q.includes('suggest') || q.includes('reduce') || q.includes('tip') || q.includes('advice')) {
            let tips = `## 💡 Money-Saving Tips\n\n`;
            if (topCat.length > 0) {
                tips += `1. **Reduce ${topCat[0][0]} spending** — it's your biggest expense at ${formatAmount(topCat[0][1])}. Try cutting it by 15% to save **${formatAmount(topCat[0][1] * 0.15)}**.\n`;
            }
            tips += `2. **Set budget goals** for all categories to track overspending.\n`;
            tips += `3. **Review subscriptions** — many people overspend on recurring services.\n`;
            tips += `4. **Use the 50/30/20 rule** — 50% needs, 30% wants, 20% savings.\n`;
            tips += `5. **Track daily expenses** — awareness is the first step to better habits.\n`;
            return tips;
        }

        if (q.includes('income')) {
            return `## 💵 Income Summary\n\n- **Total Monthly Income**: ${formatAmount(totalIncome)}\n- **Number of sources**: ${incomes.length}\n\n${incomes.map(i => `- **${i.source}**: ${formatAmount(i.amount)} (${i.date})`).join('\n')}`;
        }

        if (q.includes('budget') || q.includes('goal')) {
            if (budgetGoals.length === 0) return "You haven't set any budget goals yet. Go to **Budget Goals** to create some!";
            let response = `## 🎯 Budget Goals\n\n`;
            budgetGoals.forEach(g => {
                const spent = categorySpending[g.category] || 0;
                const pct = Math.round((spent / g.limit) * 100);
                const remaining = g.limit - spent;
                response += `### ${CATEGORY_ICONS[g.category]} ${g.category}\n- Budget: ${formatAmount(g.limit)}\n- Spent: ${formatAmount(spent)} (${pct}%)\n- ${remaining >= 0 ? `Remaining: ${formatAmount(remaining)}` : `Over by: ${formatAmount(Math.abs(remaining))}`}\n\n`;
            });
            return response;
        }

        return `I can help you with:\n- 📊 **Spending analysis** — "Analyze my spending"\n- 💰 **Savings info** — "How much have I saved?"\n- 🏆 **Top expenses** — "What's my biggest expense?"\n- 💡 **Saving tips** — "Suggest ways to save"\n- 💵 **Income details** — "Show my income"\n- 🎯 **Budget status** — "How are my budget goals?"\n\nTry asking one of these!`;
    };

    const handleSend = (text) => {
        const msg = text || input;
        if (!msg.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: msg }]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            const response = generateResponse(msg);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-[calc(100vh-120px)] flex flex-col gap-4"
        >
            {/* Header card */}
            <div className="glass-card px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">AI Financial Assistant</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-xs text-muted-foreground">Online · Powered by your financial data</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Zap className="w-3 h-3" />
                    AI Powered
                </div>
            </div>

            {/* Chat window */}
            <div className="glass-card flex-1 flex flex-col overflow-hidden">

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div className={`rounded-2xl px-4 py-3 max-w-[78%] shadow-sm text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-sm'
                                    : 'bg-card border border-border text-foreground rounded-tl-sm'
                                    }`}>
                                    {msg.role === 'assistant' ? (
                                        <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_strong]:text-primary [&_h2]:text-sm [&_h2]:font-bold [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-muted-foreground">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p>{msg.content}</p>
                                    )}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                        <User className="w-4 h-4 text-foreground" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                key="typing"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-3 items-end"
                            >
                                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 shadow-sm">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1 items-center h-4">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Suggestion chips */}
                {messages.length <= 1 && (
                    <div className="px-6 pb-3 flex flex-wrap gap-2">
                        {SUGGESTIONS.map(s => (
                            <button
                                key={s.label}
                                onClick={() => handleSend(s.label)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 text-primary font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm"
                            >
                                <span>{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input bar */}
                <div className="px-4 py-3 border-t border-border bg-background/60 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-2 bg-background rounded-full border-2 border-border shadow-md px-4 py-1 focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/10 transition-all duration-200">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about your finances..."
                            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2.5"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 hover:scale-110 active:scale-95 transition-all duration-150 shadow-sm"
                        >
                            <Send className="w-3.5 h-3.5 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AIChat;
