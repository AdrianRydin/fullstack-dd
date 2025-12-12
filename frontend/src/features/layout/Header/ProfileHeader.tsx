import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import "./profileheader.css";
import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../cart/useCart";
import { useLogout } from "../../hooks/useLogout";

export default function ProfileHeader({
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
  const logout = useLogout();
  return (
    <HeaderLayout>
      {/* MOBILE */}
      <section className="header-mobile">
        <ArrowBackIcon
          className="back-arrow"
          fontSize="large"
          sx={{ fontSize: 40, color: "#dfd8c9" }}
          onClick={goBack}
        />

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

          <h1 onClick={logout} className="logout-button">
            Log Out
          </h1>

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
