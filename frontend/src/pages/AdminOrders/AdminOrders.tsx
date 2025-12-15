import "./adminorders.css"
import { useState, useEffect } from "react"
import { AdminOrderCard } from "../../components/AdminOrderCard/AdminOrderCard"
import { getAllOrders } from "../../api/order"
import type { OrderResponse, OrderStatus } from "../../api/order"

type FilterId = "all" | "pending" | "locked" | "ready"

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All orders" },
  { id: "pending", label: "Pending" },
  { id: "locked", label: "Locked" },
  { id: "ready", label: "Ready" },
]

function matchesFilter(status: OrderStatus, filter: FilterId) {
  if (filter === "all") return true
  if (filter === "pending") return status === "PENDING"
  if (filter === "locked") return status === "LOCKED"
  if (filter === "ready") return status === "READY"
  return true
}

interface OrdersSectionProps {
  title: string
  status: OrderStatus
  orders: OrderResponse[]
  activeFilter: FilterId
  onStatusChange: (updatedOrder: OrderResponse) => void
}

function OrdersSection({
  title,
  status,
  orders,
  activeFilter,
  onStatusChange,
}: OrdersSectionProps) {
  let filtered = orders.filter((order) => order.status === status)
  if (activeFilter !== "all") {
    filtered = filtered.filter(
      (order) => order.status.toLowerCase() === activeFilter
    )
  }

  if (filtered.length === 0) return null

  return (
    <section className="order-container">
      <h2>{title}</h2>

      {filtered.map((order) => (
        <AdminOrderCard
          key={order._id}
          order={order}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  )
}

export default function AdminOrders() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all")
  const [orders, setOrders] = useState<OrderResponse[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders()
        setOrders(data)
      } catch (error) {
        console.error("Kunde inte hämta orders", error)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = (updatedOrder: OrderResponse) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    )
  }

  return (
    <section className="admin-orders-container">
      <h1>Orders</h1>

      <div className="orders-filter-bar">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            className={
              "orders-filter-button" +
              (activeFilter === filter.id ? "order-filter-button--active" : "")
            }
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <OrdersSection
        title="Pending"
        status="PENDING"
        orders={orders}
        activeFilter={activeFilter}
        onStatusChange={handleStatusChange}
      />
      <OrdersSection
        title="Locked / Cooking"
        status="LOCKED"
        orders={orders}
        activeFilter={activeFilter}
        onStatusChange={handleStatusChange}
      />
      <OrdersSection
        title="Ready"
        status="READY"
        orders={orders}
        activeFilter={activeFilter}
        onStatusChange={handleStatusChange}
      />
    </section>
  )
}
