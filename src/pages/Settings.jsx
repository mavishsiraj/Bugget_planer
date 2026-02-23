import { motion } from 'framer-motion';
import { useBudget } from '@/contexts/BudgetContext';
import { CURRENCIES } from '@/types/budget';
import { Moon, Sun, Globe, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const Settings = () => {
    const { currency, setCurrency } = useBudget();
    const { theme, setTheme } = useTheme();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold">Settings</h1>

            {/* Theme */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Appearance</h2>
                </div>
                <div className="flex gap-3">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="flex-1 gap-2 rounded-xl">
                        <Sun className="w-4 h-4" /> Light
                    </Button>
                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="flex-1 gap-2 rounded-xl">
                        <Moon className="w-4 h-4" /> Dark
                    </Button>
                </div>
            </motion.div>

            {/* Currency */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Currency</h2>
                </div>
                <Select value={currency} onValueChange={v => setCurrency(v)}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {Object.entries(CURRENCIES).map(([code, info]) => (
                            <SelectItem key={code} value={code}>{info.symbol} {info.name} ({code})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </motion.div>
        </motion.div>
    );
};

export default Settings;
