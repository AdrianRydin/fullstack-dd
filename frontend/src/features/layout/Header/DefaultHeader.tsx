import { Link } from "react-router-dom";
import "../../../components/Header/header.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button/Button";

export default function DefaultHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const { isLoggedIn } = useAuth();
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

            <Link to={"/cart"}>
              <h1>Cart</h1>
            </Link>
            <Link to={"/register"}>
              {!isLoggedIn && <Button type="button" text="Login | Register" />}
              {isLoggedIn && <Button type="button" text="Profile" />}
            </Link>
          </nav>
        </div>
      </section>
    </header>
  );
}
