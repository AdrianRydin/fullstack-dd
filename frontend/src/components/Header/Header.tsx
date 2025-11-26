import "./header.css";
import { matchPath, useLocation } from "react-router-dom";
import DefaultHeader from "../../features/layout/Header/DefaultHeader.tsx";
import MenuHeader from "../../features/layout/Header/MenuHeader.tsx";
import BackHeader from "../../features/layout/Header/BackHeader.tsx";

export default function Header() {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/receipt") {
    return <DefaultHeader />;
  }
  if (pathname === "/menu") {
    return <MenuHeader />;
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
    return <BackHeader />;
  }

  return <DefaultHeader />;
}
