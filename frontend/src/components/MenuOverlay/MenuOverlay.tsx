import "./menu-overlay.css";
import { useEffect, useRef } from "react";
import { animate } from "motion";

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
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
        <aside className="link-container">
          <h1>Home</h1>
          <div className="line"></div>
        </aside>
        <aside className="link-container">
          <h1>Login | Register</h1>
          <div className="line"></div>
        </aside>
        <aside className="link-container">
          <h1>About us</h1>
          <div className="line"></div>
        </aside>
        <aside className="link-container">
          <h1>Cart</h1>
          <div className="line"></div>
        </aside>
        <aside className="link-container">
          <h1>Contact</h1>
        </aside>
      </aside>
    </section>
  );
}
