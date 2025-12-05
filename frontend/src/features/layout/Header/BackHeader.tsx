import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import "./backheader.css";

export default function BackHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <HeaderLayout>
      {/* MOBILE */}
      <section className="header-mobile">
        <Link to={"/menu"}>
          <ArrowBackIcon
            className="back-arrow"
            fontSize="large"
            sx={{ fontSize: 40, color: "#dfd8c9" }}
          />
        </Link>
        <aside
          className={`hamburger-menu-container ${isMenuOpen ? "open" : ""}`}
          onClick={onToggleMenu}
        >
          <span className="header-span-1"></span>
          <span className="header-span-2"></span>
          <span className="header-span-3"></span>
        </aside>
      </section>

      {/* DESKTOP */}
      <section className="header-desktop">
        <Link to={"/menu"}>
          <ArrowBackIcon
            className="back-arrow"
            fontSize="large"
            sx={{ fontSize: 40, color: "#dfd8c9" }}
          />
        </Link>
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
      </section>
    </HeaderLayout>
  );
}
