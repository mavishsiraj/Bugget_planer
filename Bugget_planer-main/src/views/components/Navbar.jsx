import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../models/navItems";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">✏️ Budget Planner</div>

      <div className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}