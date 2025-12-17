import "./header.css";
import { useLocation } from "react-router-dom";
import DefaultHeader from "../../features/layout/Header/DefaultHeader.tsx";
import MenuHeader from "../../features/layout/Header/MenuHeader.tsx";
import BackHeader from "../../features/layout/Header/BackHeader.tsx";
import type { AuthUser } from "../../types/User.ts";
import ProfileHeader from "../../features/layout/Header/ProfileHeader.tsx";
import AdminHeader from "../../features/layout/Header/Admin/AdminHeader.tsx";

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isLoggedIn: boolean;
  user: AuthUser | null;
};

export default function Header({ isMenuOpen, onToggleMenu, user }: HeaderProps) {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  const isStaffOrAdmin = user?.role === "ADMIN" || user?.role === "STAFF";

  if (isAdminRoute && isStaffOrAdmin) {
    return <AdminHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
  }

  const backHeaderPaths = ["/about", "/cart", "/login", "/register", "/review"];
  const profileHeaderPaths = ["/profile", "/reviewOrder", "/previous-orders"];

  if (pathname === "/" || pathname === "/receipt") {
    return (
      <DefaultHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
    );
  }
  if (pathname === "/menu") {
    return <MenuHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
  }

  if (backHeaderPaths.includes(pathname)) {
    return <BackHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
  }

  if (profileHeaderPaths.includes(pathname)) {
    return (
      <ProfileHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
    );
  }

  return <DefaultHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
}
