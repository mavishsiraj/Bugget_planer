import { useLocation, NavLink } from 'react-router-dom';
import { LayoutDashboard, CreditCard, TrendingUp, Target, BarChart3, MessageSquare, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/expenses', icon: CreditCard, label: 'Expenses' },
    { to: '/income', icon: TrendingUp, label: 'Income' },
    { to: '/budget', icon: Target, label: 'Budget' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/ai-chat', icon: MessageSquare, label: 'AI Chat' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

const FloatingNav = () => {
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed top-4 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1 px-3 py-2 rounded-full
                bg-white/60 dark:bg-white/10
                backdrop-blur-2xl backdrop-saturate-200
                border border-white/30 dark:border-white/15
                shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]
                dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
            {navItems.map(item => {
                const isActive = location.pathname === item.to;
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                            ${isActive
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                            }`}
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </motion.nav>
    );
};

export default FloatingNav;
