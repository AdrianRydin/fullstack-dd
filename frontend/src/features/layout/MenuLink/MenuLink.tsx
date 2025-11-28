import { Link } from "react-router-dom";
import "./menulink.css";

type MenuLinkProps = {
  to: string;
  label: string;
  onClose: () => void;
};

export function MenuLink({ to, label, onClose }: MenuLinkProps) {
  return (
    <aside className="link-container">
      <Link to={to} onClick={onClose}>
        <h1>{label}</h1>
      </Link>
      <div className="line"></div>
    </aside>
  );
}
