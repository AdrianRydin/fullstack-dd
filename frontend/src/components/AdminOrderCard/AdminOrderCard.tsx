import Button from "../Button/Button"
import "./AdminOrderCard.css"
import type { OrderResponse } from "../../api/order"
import { lockOrder, markOrderReady } from "../../api/order"

interface AdminOrderCardProps {
  order: OrderResponse
  onStatusChange: (updatedOrder: OrderResponse) => void
}

export function AdminOrderCard({ order, onStatusChange }: AdminOrderCardProps) {
  const handleButtonClick = async () => {
    try {
      let updatedOrder: OrderResponse
      if (order.status === "PENDING") {
        updatedOrder = await lockOrder(order._id)
      } else if (order.status === "LOCKED") {
        updatedOrder = await markOrderReady(order._id)
      } else {
        return
      }
      onStatusChange(updatedOrder)
    } catch (err) {
      console.error("Kunde inte uppdatera orderstatus", err)
    }
  }

  const buttonText =
    order.status === "PENDING"
      ? "Lock"
      : order.status === "LOCKED"
      ? "Mark Ready"
      : null

  return (
    <section className="admin-order-card-container">
      <section className="admin-order-card__info-container-text">
        <p>Date: {order.createdAt}</p>
        <p>Order ID: {order._id}</p>

        {order.items.map((item) => (
          <p key={item.menuItemId}>
            {item.name}: {item.qty}
          </p>
        ))}

        <p>Status: {order.status}</p>

        <section className="admin-order-card-button-container">
          {buttonText && (
            <Button
              text={buttonText}
              type="button"
              onClick={handleButtonClick}
            />
          )}
        </section>
      </section>
    </section>
  )
}
