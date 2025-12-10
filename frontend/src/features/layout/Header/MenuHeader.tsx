import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./headerlayout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { useCart } from "../../cart/useCart";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button/Button";

export default function MenuHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { totalQuantity } = useCart();
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
          <Link to={"/menu"}>
            <h1>Menu</h1>
          </Link>

          <Link to={"/login"}>
            {!isLoggedIn && <Button type="button" text="Login | Register" />}
            {isLoggedIn && <Button type="button" text="Profile" />}
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
