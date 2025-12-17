import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeaderLayout from "../HeaderLayout";
import "../headerlayout.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import Button from "@mui/material/Button";

export default function AdminHeader({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const isDashboard = location.pathname === "/admin-dashboard";

  return (
    <HeaderLayout>
      {/* MOBILE */}
      <section className="header-mobile">
        {!isDashboard ? (
          <ArrowBackIcon
            sx={{ fontSize: 40, color: "#dfd8c9", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
        ) : (
          <div style={{ width: 40 }} />
        )}
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
      <section className="header-desktop admin-header-desktop">
        {!isDashboard ? (
          <ArrowBackIcon
            sx={{ fontSize: 40, color: "#dfd8c9", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
        ) : (
          <div style={{ width: 40 }} />
        )}
        <Button
          onClick={logout}
          sx={{
            border: "1px solid #dfd8c9",
            color: "#dfd8c9",
            padding: "0.4rem 0.8rem",
            fontSize: "1rem",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "#f57a6a",
            },
          }}
        >
          Log out
        </Button>
      </section>
    </HeaderLayout>
  );
}
