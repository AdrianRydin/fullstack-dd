import { Link } from "react-router-dom";
import "./menulink.css";

type MenuLinkProps = {
  to: string;
  label: string;
  onClose: () => void;
  onClick?: () => void;
};

export function MenuLink({ to, label, onClose, onClick }: MenuLinkProps) {
  const handleClick = () => {
    onClick?.();
    onClose();
  };
  return (
    <aside className="link-container">
      <Link to={to} onClick={handleClick}>
        <h1>{label}</h1>
      </Link>
      <div className="line"></div>
    </aside>
  );
}
