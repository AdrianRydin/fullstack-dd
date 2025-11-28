import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./headerlayout.css";
import { Link } from "react-router-dom";

import HeaderLayout from "./HeaderLayout";

export default function MenuHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <HeaderLayout>
      <Link to={"/"}>
        <ArrowBackIcon
          className="back-arrow"
          fontSize="large"
          sx={{ fontSize: 40, color: "#dfd8c9" }}
        />
      </Link>

      <section className="menu-header-cart-container">
        <Link to={"/cart"}>
          <ShoppingCartIcon sx={{ fontSize: 30, color: "#dfd8c9" }} />
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
    </HeaderLayout>
  );
}
