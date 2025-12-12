import "./menu-overlay.css";
import { useEffect, useRef } from "react";
import { animate } from "motion";
import { MenuLink } from "../../features/layout/MenuLink/MenuLink";
import type { AuthUser } from "../../types/User";

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  user: AuthUser | null;
};

export default function Menu({ isOpen, onClose }: MenuOverlayProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.pointerEvents = "auto";
      document.body.style.overflow = "hidden";

      animate(
        el,
        {
          transform: ["translateX(0%)"],
          opacity: 1,
        },
        {
          duration: 0.3,
        }
      );
    } else {
      document.body.style.overflow = "";

      animate(
        el,
        { transform: "translate(100%)", opacity: 0 },
        { duration: 0.2 }
      ).finished.then(() => {
        el.style.pointerEvents = "none";
      });
    }
  }, [isOpen]);

  return (
    <section className="menu-container" ref={containerRef} onClick={onClose}>
      <aside className="menu-panel" onClick={(e) => e.stopPropagation()}>
        <MenuLink to="/" label="Home" onClose={onClose} />
        <MenuLink to="/menu" label="Menu" onClose={onClose} />
        <MenuLink to="/register" label="Login/Register" onClose={onClose} />
        <MenuLink to="/cart" label="Cart" onClose={onClose} />
        <MenuLink to="/previous-orders" label="Profile" onClose={onClose} />
      </aside>
    </section>
  );
}
