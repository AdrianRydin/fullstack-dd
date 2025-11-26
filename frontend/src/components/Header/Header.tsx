import "./header.css";
import { matchPath, useLocation } from "react-router-dom";
import DefaultHeader from "../../features/layout/Header/DefaultHeader.tsx";
import MenuHeader from "../../features/layout/Header/MenuHeader.tsx";
import BackHeader from "../../features/layout/Header/BackHeader.tsx";

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export default function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/receipt") {
    return (
      <DefaultHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
    );
  }
  if (pathname === "/menu") {
    return <MenuHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
  }

  const backHeaderPaths = [
    "/cart",
    "/login",
    "/register",
    "/profile",
    "/reviewOrder",
  ];

  const isProfileRoute = matchPath("/profile/*", pathname);

  if (backHeaderPaths.includes(pathname) || isProfileRoute) {
    return <BackHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
  }

  return <DefaultHeader isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />;
}
