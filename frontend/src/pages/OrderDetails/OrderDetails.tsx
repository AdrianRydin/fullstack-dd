import "./OrderDetails.css"
import { useParams } from "react-router-dom"
import { previousOrders } from "../PreviousOrders/PreviousOrders"
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard"

function OrderDetailsPage() {
  const { id } = useParams()
  const order = previousOrders.find((o) => o.id === id)

  if (!order) return <p>Order not found.</p>

  return (
    <section className="order-details-page-wrapper">
      <h1 className="order-details-title">Order Details</h1>
      <section className="order-details-oversight-wrapper">
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        <p>Order id: {order.id}</p>
        <p className="order-details-total-price">
          Order Total: {order.totalPrice} kr
        </p>
      </section>
      <section className="order-details-list-wrapper">
        {order.items.map((item) => (
          <OrderDetailsCard item={item} />
        ))}
      </section>
    </section>
  )
}

export default OrderDetailsPage
