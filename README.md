# MintFlow

A personal finance dashboard built for clarity. MintFlow consolidates your income, expenses, and budget goals into one clean interface, giving you the financial picture you need without the noise.

## Overview

Managing personal finances often means juggling multiple spreadsheets, banking apps, and mental notes. MintFlow brings all of that into a single, fast, and visually coherent dashboard. It is designed to feel less like accounting software and more like a financial companion — one that surfaces what matters and stays out of the way.

The application is entirely client-side. No accounts, no servers, no data leaving your browser.

## Features

**Dashboard**
A real-time summary of your financial health: total balance, monthly income, total expenses, and savings rate. Includes an AI Insights panel that identifies spending patterns and a categorized spending breakdown chart.

**Expense Tracking**
Log and categorize expenses with date, category, and note. Filter by category or scroll through the full history. Expenses persist locally across sessions.

**Income Management**
Record income from multiple sources — salary, freelance, investments, and custom sources. Each source is color-coded for quick identification.

**Budget Goals**
Set monthly spending limits per category. Visual progress bars with category-specific colors show how much of each budget remains. Alerts surface when you are approaching or have exceeded a limit.

**Analytics**
Four chart views: spending by category (donut), monthly income vs. expense trend (line), income vs. expenses comparison (bar), and budget utilization by category (horizontal bar).

**AI Financial Assistant**
A conversational interface powered by your local financial data. Ask natural language questions to get spending analyses, savings summaries, budget status, and actionable tips. Runs entirely in-browser — no external API required.

**Settings**
Configure currency, display preferences, and application theme.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Charts | Recharts |
| Routing | React Router v6 |
| Markdown | react-markdown |
| Notifications | Sonner |
| State | React Context API |

## Getting Started

**Prerequisites:** Node.js 18 or later, npm or bun.

```bash
# Clone the repository
git clone https://github.com/your-username/mintflow.git
cd mintflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
  components/          # Reusable UI components
    ui/                # shadcn/ui base components
    FloatingNav.jsx    # Top navigation bar
    NavLink.jsx        # Navigation link wrapper
  contexts/
    BudgetContext.jsx  # Global financial state (expenses, income, goals)
  hooks/               # Custom React hooks
  pages/               # Route-level page components
    Dashboard.jsx
    Expenses.jsx
    Income.jsx
    BudgetGoals.jsx
    Analytics.jsx
    AIChat.jsx
    Settings.jsx
  types/
    budget.js          # Category definitions, icons, and color palette
  lib/
    utils.js           # Shared utility functions
  index.css            # Global styles and design tokens
  App.jsx              # Router and layout shell
  main.jsx             # Application entry point
```

## Data Persistence

All financial data is stored in the browser's `localStorage`. Clearing site data will reset the application. There is no cloud sync or external storage by design.

## Theming

MintFlow supports light and dark modes via `next-themes`. The active theme is persisted across sessions. The design uses CSS custom properties for all color tokens, so both themes are fully consistent.

## License

MIT
