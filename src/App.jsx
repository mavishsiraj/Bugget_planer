import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BudgetProvider } from "@/contexts/BudgetContext";
import FloatingNav from "@/components/FloatingNav";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import BudgetGoals from "./pages/BudgetGoals";
import Analytics from "./pages/Analytics";
import AIChat from "./pages/AIChat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <BudgetProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <div className="min-h-screen bg-background font-sans pt-20">
                            <main className="container max-w-7xl mx-auto px-6 py-8">
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/expenses" element={<Expenses />} />
                                    <Route path="/income" element={<Income />} />
                                    <Route path="/budget" element={<BudgetGoals />} />
                                    <Route path="/analytics" element={<Analytics />} />
                                    <Route path="/ai-chat" element={<AIChat />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <FloatingNav />
                        </div>
                    </BrowserRouter>
                </TooltipProvider>
            </BudgetProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
