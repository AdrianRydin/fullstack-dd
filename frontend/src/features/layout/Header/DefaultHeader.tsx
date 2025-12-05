import { Link } from "react-router-dom";
import "../../../components/Header/header.css";

export default function DefaultHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <header className="header-container-default">
      {/* MOBILE */}
      <section className="header-mobile">
        <div className="header-inner-default">
          <aside
            className={`hamburger-menu-container ${isMenuOpen ? "open" : ""}`}
            onClick={onToggleMenu}
          >
            <span className="header-span-1"></span>
            <span className="header-span-2"></span>
            <span className="header-span-3"></span>
          </aside>
        </div>
      </section>

      <section className="header-desktop">
        <div className="header-inner-default">
          <nav className="header-desktop-link-container">
            <Link to={"/menu"}>
              <h1>Menu</h1>
            </Link>
            <Link to={"/about"}>
              <h1>About us</h1>
            </Link>
            <Link to={"/contact"}>
              <h1>Contact</h1>
            </Link>
            <Link to={"/cart"}>
              <h1>Cart</h1>
            </Link>
          </nav>
        </div>
      </section>
    </header>
  );
}
