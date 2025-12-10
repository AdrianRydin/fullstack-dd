import "./AdminDashboard.css";
import Button from "../../components/Button/Button";

import { useNavigate } from "react-router-dom";
import { useAdminRedirect } from "../../features/authentication/hooks/useAdminRedirect";

function AdminDashboardPage() {
  const navigate = useNavigate();

  const isAdmin = useAdminRedirect();
  if (!isAdmin) return null;

  return (
    <section className="wrapper">
      <h1 className="title">Dashboard</h1>
      <section className="button-wrapper">
        <Button text={"Menu"} onClick={() => navigate("/admin-menu")} />
        <Button text={"Orders"} onClick={() => navigate("/admin-orders")} />
        <Button
          text={"Inventory"}
          onClick={() => navigate("/admin-inventory")}
        />
      </section>
    </section>
  );
}

export default AdminDashboardPage;
