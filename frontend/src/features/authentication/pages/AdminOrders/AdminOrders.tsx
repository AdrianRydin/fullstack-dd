import { useState } from "react";
import { AdminOrderCard } from "../../components/AdminOrderCard/AdminOrderCard";
import "./adminorders.css";

type OrderStatus = "open" | "locked" | "ready" | "delivered";

interface SushiRoll {
  id: number;
  date: string;
  orderNumber: number;
  name: string;
  quantity: number;
  status: OrderStatus;
}
// Fake data tills backend finns
const sushiRolls: SushiRoll[] = [
  {
    id: 1,
    date: "2025-11-26",
    orderNumber: 201202,
    name: "California Roll",
    quantity: 2,
    status: "open",
  },
  {
    id: 2,
    date: "2025-11-26",
    orderNumber: 201202,
    name: "California Roll",
    quantity: 2,
    status: "delivered",
  },
  {
    id: 3,
    date: "2025-11-26",
    orderNumber: 201202,
    name: "California Roll",
    quantity: 2,
    status: "ready",
  },
  {
    id: 4,
    date: "2025-11-26",
    orderNumber: 201202,
    name: "California Roll",
    quantity: 2,
    status: "locked",
  },
  {
    id: 5,
    date: "2025-11-26",
    orderNumber: 201202,
    name: "California Roll",
    quantity: 2,
    status: "locked",
  },
];

type FilterId = "all" | "unprocessed" | "current";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All orders" },
  { id: "unprocessed", label: "Unprocessed" },
  { id: "current", label: "Current" },
];

function matchesFilter(order: SushiRoll, filter: FilterId) {
  switch (filter) {
    case "all":
      return true;
    case "unprocessed":
      return order.status === "open";
    case "current":
      return order.status !== "delivered";
    default:
      return true;
  }
}

interface OrdersSectionProps {
  title: string;
  status: OrderStatus;
  orders: SushiRoll[];
  activeFilter: FilterId;
}

function OrdersSection({
  title,
  status,
  orders,
  activeFilter,
}: OrdersSectionProps) {
  const filtered = orders.filter(
    (order) => order.status === status && matchesFilter(order, activeFilter)
  );

  if (filtered.length === 0) return null;

  return (
    <section className="order-container">
      <h2>{title}</h2>
      {filtered.map((item) => (
        <AdminOrderCard
          key={item.id}
          date={item.date}
          orderNumber={item.orderNumber}
          name={item.name}
          quantity={item.quantity}
          status={item.status}
        />
      ))}
    </section>
  );
}

export default function AdminOrders() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
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
        title="Open"
        status="open"
        orders={sushiRolls}
        activeFilter={activeFilter}
      />
      <OrdersSection
        title="Locked / Cooking"
        status="locked"
        orders={sushiRolls}
        activeFilter={activeFilter}
      />
      <OrdersSection
        title="Ready"
        status="ready"
        orders={sushiRolls}
        activeFilter={activeFilter}
      />
      <OrdersSection
        title="Delivered"
        status="delivered"
        orders={sushiRolls}
        activeFilter={activeFilter}
      />
    </section>
  );
}
