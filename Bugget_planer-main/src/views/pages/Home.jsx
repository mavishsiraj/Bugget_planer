import { motion } from "framer-motion";
import "../../style/home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* ===== HERO SECTION (A&P TEMPLATE STYLE) ===== */}
      <motion.header
        className="home-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Because budgeting isn't just about numbers, it's about making your money work for you
        </h1>

        <p className="hero-subtitle">
          Take control of your finances with intelligent tracking and insights
        </p>

        <a href="#services" className="cta-link">Let's Talk</a>
      </motion.header>

      {/* ===== CARDS SECTION ===== */}
      <motion.section
        className="cards-doodle-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="home-cards">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="doodle-card card-teal">
              <h3>Track Expenses</h3>
              <p>Monitor your spending across multiple categories and get insights into where your money goes every month.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="doodle-card card-pink">
              <h3>Manage Income</h3>
              <p>Track all your income sources and stay on top of your earnings with our simple income management tools.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="doodle-card card-yellow">
              <h3>Financial Summary</h3>
              <p>Get a complete overview of your finances with detailed analytics and budget tracking at a glance.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== QUOTE SECTION ===== */}
      <section className="quote-section">
        <motion.p
          className="quote-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Money flows where attention goes.
        </motion.p>

        <motion.p
          className="quote-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Start your smart budgeting journey today
        </motion.p>
      </section>
    </div>
  );
}
