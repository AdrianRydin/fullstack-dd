import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./headerlayout.css";
import { Link } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { useCart } from "../../cart/useCart";

export default function MenuHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  
  const { totalQuantity } = useCart();

  return (
    <HeaderLayout>
      <section className="header-mobile">
        <Link to={"/"}>
          <ArrowBackIcon
            className="back-arrow"
            fontSize="large"
            sx={{ fontSize: 40, color: "#dfd8c9" }}
          />
        </Link>

        <section className="menu-header-cart-container">
          <Link to={"/cart"} className="cart-icon-wrapper">
            <ShoppingCartIcon sx={{ fontSize: 30, color: "#dfd8c9" }} />
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
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
      </section>

      <section className="header-desktop">
        <Link to={"/"}>
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
          <Link to={"/cart"} className="cart-icon-wrapper">
            <ShoppingCartIcon sx={{ fontSize: 30, color: "#dfd8c9" }} />
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>
        </nav>
      </section>
    </HeaderLayout>
  );
}
