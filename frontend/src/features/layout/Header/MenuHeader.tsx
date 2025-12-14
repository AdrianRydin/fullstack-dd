import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./headerlayout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { useCart } from "../../cart/useCart";
import { useAuthStatus } from "../../hooks/useAuthStatus";

export default function MenuHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { totalQuantity } = useCart();
  const { loading, isLoggedIn } = useAuthStatus();
  return (
    <HeaderLayout>
      <section className="header-mobile">
        <ArrowBackIcon
          className="back-arrow"
          fontSize="large"
          sx={{ fontSize: 40, color: "#dfd8c9" }}
          onClick={goBack}
        />

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
        <ArrowBackIcon
          className="back-arrow"
          fontSize="large"
          sx={{ fontSize: 40, color: "#dfd8c9" }}
          onClick={goBack}
        />

        <nav className="header-desktop-link-container">
          <Link to={"/"}>
            <h1>Home</h1>
          </Link>
          <Link to={"/menu"}>
            <h1>Menu</h1>
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
      </section>
    </HeaderLayout>
  );
}
