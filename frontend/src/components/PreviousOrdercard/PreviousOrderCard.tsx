import "./PreviousOrderCard.css"
import { type PreviousOrder } from "../../pages/PreviousOrders/PreviousOrders"
import Inventory2Icon from "@mui/icons-material/Inventory2"

import { Link } from "react-router-dom"

interface PreviousOrderCardProps {
  order: PreviousOrder
}

function PreviousOrderCard({ order }: PreviousOrderCardProps) {
  return (
    <section className="previous-order-card-wrapper">
      <section className="previous-order-icon-wrapper">
        <Inventory2Icon className="previous-order-card-icon" />
      </section>
      <section className="previous-order-info-wrapper">
        <p>Order id: {order.id}</p>
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        <p>Total: {order.totalPrice} kr</p>
      </section>
      <section className="previous-order-info-button-wrapper">
        <Link to={`/orders/${order.id}`} className="previous-order-link">
          <button className="previous-order-info-button">Info</button>
        </Link>
      </section>
      <section className="previous-order-icon-wrapper"></section>
    </section>
  )
}

export default PreviousOrderCard
