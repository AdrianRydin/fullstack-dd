import "./OrderDetails.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getOrder, type OrderResponse } from "../../api/order"
import { useAuthStore } from "../../features/authentication/store/authStore"
import OrderDetailsReceipt from "../../components/OrderDetailsCard/OrderDetailsCard"

function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user, token } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { redirectTo: `/orders/${id}` },
      })
      return
    }

    if (!id) return

    getOrder(id)
      .then((data) => setOrder(data))
      .catch((err) => {
        console.error(err)
        setError("Could not load order")
      })
      .finally(() => setLoading(false))
  }, [id, user, token, navigate])

  if (loading) return <p>Loading order...</p>
  if (error || !order) return <p>{error || "Order not found."}</p>

  return (
    <main className="receipt-page">
      <OrderDetailsReceipt
        orderId={order._id}
        items={order.items}
        totalPrice={order.totalPrice}
        createdAt={order.createdAt}
        status={order.status}
      />
    </main>
  )
}

export default OrderDetailsPage
