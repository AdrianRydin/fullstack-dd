import "./PreviousOrderCard.css";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link } from "react-router-dom";
import type { OrderResponse } from "../../api/order";

interface PreviousOrderCardProps {
  order: OrderResponse;
}

function PreviousOrderCard({ order }: PreviousOrderCardProps) {
  const shortId = order._id.slice(-6).toUpperCase();
  const date = new Date(order.createdAt).toLocaleDateString();

  const statusLabel =
    order.status === "PENDING"
      ? "Pending"
      : order.status === "LOCKED"
      ? "Locked"
      : order.status === "READY"
      ? "Ready"
      : "Cancelled";

  return (
    <section className="previous-order-card-wrapper">
      <section className="previous-order-icon-wrapper">
        <Inventory2Icon className="previous-order-card-icon" />
      </section>
      <section className="previous-order-info-wrapper">
        <p>Order id: {shortId}</p>
        <p>Date: {date}</p>
        <p>Status: {statusLabel}</p>
        <p>Total: {order.totalPrice} kr</p>
      </section>
      <section className="previous-order-info-button-wrapper">
        <Link
          to={`/orders/${order._id}`}
          className="previous-order-link"
        >
          <button className="previous-order-info-button">Info</button>
        </Link>
      </section>
      <section className="previous-order-icon-wrapper"></section>
    </section>
  );
}

export default PreviousOrderCard;
