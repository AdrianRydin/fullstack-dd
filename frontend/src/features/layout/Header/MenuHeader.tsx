import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./headerlayout.css";
import { useState } from "react";
import HeaderLayout from "./HeaderLayout";

export default function MenuHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderLayout>
      <ArrowBackIcon
        className="back-arrow"
        fontSize="large"
        sx={{ fontSize: 40, color: "#dfd8c9" }}
      />

      <section className="menu-header-cart-container">
        <ShoppingCartIcon sx={{ fontSize: 30, color: "#dfd8c9" }} />
        <aside
          className={`hamburger-menu-container ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="header-span-1"></span>
          <span className="header-span-2"></span>
          <span className="header-span-3"></span>
        </aside>
      </section>
    </HeaderLayout>
  );
}
