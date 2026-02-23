# Budget Planner - Dark Professional Theme Implementation

## Overview
Your budget planner has been completely transformed with a dark professional theme inspired by the A&P (Ashton & Porter) template. The entire background, navigation, cards, and pages now use a cohesive dark color scheme with gold accents.

## Color Scheme
- **Primary Dark:** `#1a1a1a` (main background)
- **Secondary Dark:** `#242424` (cards, sections)
- **Gold Accent:** `#d4af37` (highlights, borders)
- **Text Primary:** `#ffffff` (white text)
- **Text Secondary:** `#b0b0b0` (gray text)
- **Border Color:** `#333333`

## What Was Changed

### 1. **Global Styles** (`src/index.css`)
- Updated color scheme variables
- Changed button styles to match dark theme with gold borders
- Updated form input styles for dark backgrounds
- Refined focus states for better accessibility

### 2. **Navigation Bar** (`src/style/home.css`)
- Dark background with sticky positioning
- Gold accent for logo and active links
- Smooth transitions on hover
- Professional uppercase styling

### 3. **Hero Section**
- Large hero image area with gradient overlay
- Decorative chart visualization on the right
- Gold accents for visual interest
- Responsive design for all screen sizes

### 4. **Cards Section**
- Grid layout that adapts to screen size
- Dark gradient backgrounds
- Gold top border on hover
- Smooth animations and transitions

### 5. **Pages Updated**

#### Home Page (`src/views/pages/Home.jsx`)
- Professional hero section with title and subtitle
- Feature cards with tag badges
- Quote section
- Full dark theme styling

#### Expenses Page (`src/views/pages/Expenses.jsx`)
- Form to add new expenses
- Category dropdown (Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other)
- Amount input with decimal support
- Date picker
- Real-time expense tracking
- Recent expenses list with color-coded amounts

#### Income Page (`src/views/pages/Income.jsx`)
- Form to add new income
- Income source dropdown (Salary, Freelance, Investment, Bonus, Gifts, Other)
- Amount input with decimal support
- Date picker
- Total income tracking
- Recent income list with green-coded amounts

#### Summary Page (`src/views/pages/Summary.jsx`)
- Financial dashboard with key metrics
- Total Income (green: `#2fa46a`)
- Total Expenses (red: `#f26d5b`)
- Available Balance (gold: `#d4af37`)
- Budget usage bar chart
- Top expense category showcase
- Detailed expense breakdown table
- Monthly statistics

### 6. **App Styles** (`src/App.css`)
- Professional page sections with proper padding
- Stat cards with gradient backgrounds
- Form styling for dark theme
- Table styling with gold highlights
- Responsive button styles

### 7. **Backend Integration** (`backend/app.js`)
- Successfully mounted all routes:
  - `/api/auth` - Authentication endpoints
  - `/api/budget` - Budget management endpoints
  - `/api/expense` - Expense tracking endpoints

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login

### Budget Management (`/api/budget`)
- `POST /set` - Set budget limit (requires auth)
- `GET /current` - Get current budget (requires auth)

### Expenses (`/api/expense`)
- `POST /add` - Add new expense (requires auth)

## Setup Instructions

### Frontend Setup
1. Navigate to `Bugget_planer-main` folder
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (already created):
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Budget Planner
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to `backend` folder
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   node app.js
   ```

## Features

### Dark Professional Theme
- Modern dark background (`#1a1a1a`)
- Gold accent colors (`#d4af37`)
- Smooth transitions and hover effects
- Professional typography
- Responsive design

### Expense Tracking
- Add expenses with category, amount, description, and date
- Track multiple expense categories
- Real-time calculations
- Display recent expenses

### Income Tracking
- Add income from various sources
- Track total income
- View recent income entries
- Support for different income types

### Financial Summary
- Dashboard with key metrics
- Budget usage visualization
- Expense breakdown by category
- Monthly statistics
- Professional table display

### User Authentication
- Secure login/signup
- JWT token management
- Protected routes (using auth middleware)

## Color Guide for Components

| Component | Color | Hex Code |
|-----------|-------|----------|
| Primary Background | Dark Charcoal | #1a1a1a |
| Secondary Background | Dark Gray | #242424 |
| Accent/Gold | Gold | #d4af37 |
| Primary Text | White | #ffffff |
| Secondary Text | Light Gray | #b0b0b0 |
| Income (Green) | Green | #2fa46a |
| Expenses (Red) | Red | #f26d5b |
| Teal Accent | Teal | #2fa4a9 |

## Responsive Design
All pages are fully responsive:
- **Desktop:** 1400px+
- **Tablet:** 768px - 1399px
- **Mobile:** up to 767px

## How to Use

1. **Start the Server:** Run the backend on port 5000
2. **Start the Frontend:** Run the frontend dev server
3. **Navigate:** Use the navigation bar to access different sections
4. **Add Data:** Use forms on Expenses/Income pages to add financial data
5. **View Summary:** Check the Summary page for dashboard insights

## File Structure

```
backend/
├── app.js (main server with all routes mounted)
├── package.json
├── config/
│   └── db.js
├── controller/
│   ├── authController.js
│   ├── budgetController.js
│   └── expenseController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Expense.js
│   ├── Budget.js
│   └── ...
└── routes/
    ├── authRoutes.js ✓
    ├── budgetRoutes.js ✓
    └── expenseRoutes.js ✓

Bugget_planer-main/
├── .env
├── .env.example
├── package.json (includes axios)
├── src/
│   ├── App.jsx
│   ├── App.css (updated)
│   ├── index.css (updated)
│   ├── style/
│   │   └── home.css (dark theme)
│   └── views/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Expenses.jsx ✓ (updated)
│       │   ├── Income.jsx ✓ (updated)
│       │   └── Summary.jsx ✓ (updated)
│       └── components/
│           └── DoodleCard.jsx
```

## Dependencies Added
- `axios` - HTTP client for API calls

## Next Steps
1. Install dependencies: `npm install` in both folders
2. Set up environment variables
3. Connect to MongoDB
4. Test the APIs with Postman or similar tool
5. Deploy when ready

---

**Your budget planner is now completely styled with a professional dark theme using your own API routes!**
