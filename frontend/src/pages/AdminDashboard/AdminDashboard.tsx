import "./AdminDashboard.css"
import Button from "../../components/Button/Button"

import { useNavigate } from "react-router-dom"

function AdminDashboardPage() {
  const navigate = useNavigate()
  return (
    <section className="wrapper">
      <h1 className="title">Dashboard</h1>
      <section className="button-wrapper">
        <Button text={"Menu"} />
        <Button text={"Orders"} />
        <Button text={"Inventory"} onClick={() => navigate("/inventory")} />
      </section>
    </section>
  )
}

export default AdminDashboardPage
