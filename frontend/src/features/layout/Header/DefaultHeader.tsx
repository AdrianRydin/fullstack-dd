import { Link } from "react-router-dom";
import "../../../components/Header/header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useCart } from "../../cart/useCart";

export default function DefaultHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const { loading, isLoggedIn } = useAuthStatus();
  const { totalQuantity } = useCart();
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
            <Link to={"/"}>
              <h1>Home</h1>
            </Link>
            <Link to={"/menu"}>
              <h1>Menu</h1>
            </Link>
            <Link to={"/about"}>
              <h1>About us</h1>
            </Link>

            <aside className="header-desktop-cart-container">
              <Link to={"/cart"} className="cart-icon-wrapper">
                <ShoppingCartIcon sx={{ fontSize: 30, color: "#dfd8c9" }} />
                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </Link>

              {loading ? null : isLoggedIn ? (
                <Link to={"/previous-orders"}>
                  <aside className="login-button">
                    <h1>Profile</h1>
                  </aside>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <aside className="login-button">
                    <h1>Login | Register</h1>
                  </aside>
                </Link>
              )}
            </aside>
          </nav>
        </div>
      </section>
    </header>
  );
}
