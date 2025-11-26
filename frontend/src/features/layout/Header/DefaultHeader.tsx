import { useState } from "react";
import "../../../components/Header/header.css";
import HeaderLayout from "./HeaderLayout";
export default function DefaultHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderLayout>
      <aside
        className={`hamburger-menu-container ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="header-span-1"></span>
        <span className="header-span-2"></span>
        <span className="header-span-3"></span>
      </aside>
    </HeaderLayout>
  );
}
