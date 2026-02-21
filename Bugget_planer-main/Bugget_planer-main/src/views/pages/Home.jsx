import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ArrowDown from "../../assets/doodles/ArrowDown.svg";
import BG1 from "../../assets/doodles/bg1.jpg";
import HeroGrid from "../../assets/doodles/bg3.jpg";
import DoodleCard from "../components/DoodleCard";
import { homeCards } from "../../controllers/homeController";
import "../../style/home.css";

export default function Home() {
  const bgRef = useRef(null);

  useEffect(() => {
    let rafId;
    let current = 0;

    const tick = () => {
      const target = window.scrollY * 0.25;
      current += (target - current) * 0.06;
      if (bgRef.current)
        bgRef.current.style.transform = `translate3d(0, ${-current}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="home-page">

      {/* ===== HERO SECTION ===== */}
      <motion.header
        className="home-header"
       style={{ backgroundImage: `url(${HeroGrid})` }}

        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="hero-title">
          <span className="budget">Budget</span>
          <span className="planner">Planner</span>
        </h1>

        <motion.img
          src={ArrowDown}
          alt="arrow"
          className="hero-arrow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />

        <p className="hero-subtitle">
          Your creative money notebook ~ track income & expenses with joy!
        </p>

        <div className="hero-tags">
          <span className="tag fun">Fun.</span>
          <span className="tag simple">Simple.</span>
          <span className="tag organized">Organized.</span>
        </div>
      </motion.header>


      {/* ===== CARDS SECTION ===== */}
      <motion.section
        className="cards-doodle-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="home-cards">
          {homeCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <DoodleCard {...card} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Quote Section */}
<section className="quote-section">
  <motion.p
    className="quote-text"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
  >
    “Money flows where attention goes.”
  </motion.p>

  <motion.p
    className="quote-sub"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 1 }}
  >
    Track gently. Improve naturally.
  </motion.p>
</section>



      {/* ===== PARALLAX BACKGROUND ===== */}
      <div className="home-bg-wrapper">
        <div
          className="home-bg-section"
          ref={bgRef}
          style={{ backgroundImage: `url(${BG1})` }}
        />
      </div>

    </div>
  );
}
