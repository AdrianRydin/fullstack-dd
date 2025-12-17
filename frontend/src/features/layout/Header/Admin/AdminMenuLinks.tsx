import { useLogout } from "../../../hooks/useLogout";
import { MenuLink } from "../../MenuLink/MenuLink";

export function AdminMenuLinks({ onClose }: { onClose: () => void }) {
  const logout = useLogout();

  return (
    <>
      <MenuLink to="/admin-dashboard" label="Dashboard" onClose={onClose} />
      <MenuLink to="/admin-orders" label="Orders" onClose={onClose} />
      <MenuLink to="/admin-inventory" label="Inventory" onClose={onClose} />
      <MenuLink to="/admin-menu" label="Menu" onClose={onClose} />
      <MenuLink
        to="/"
        label="Logout"
        onClose={onClose}
        onClick={logout}
      />
    </>
  );
}
