import PreviousOrderCard from "../../components/PreviousOrdercard/PreviousOrderCard"
import "./previousOrders.css"

export interface PreviousOrder {
  id: string
  date: string
  status: "delivered" | "processing" | "canceled" | "on-the-way"
  totalPrice: number
  items: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
}

export const previousOrders: PreviousOrder[] = [
  {
    id: "ORD-102391",
    date: "2025-01-12",
    status: "delivered",
    totalPrice: 249,
    items: [
      { id: 1, name: "California Roll", quantity: 1, price: 95 },
      { id: 3, name: "Salmon Avocado Roll", quantity: 2, price: 77 },
    ],
  },
  {
    id: "ORD-102392",
    date: "2025-02-03",
    status: "on-the-way",
    totalPrice: 318,
    items: [
      { id: 2, name: "Spicy Tuna Roll", quantity: 2, price: 109 },
      { id: 5, name: "Tempura Ebi Roll", quantity: 1, price: 100 },
    ],
  },
  {
    id: "ORD-102393",
    date: "2025-02-15",
    status: "processing",
    totalPrice: 189,
    items: [
      { id: 4, name: "Crispy Salmon Roll", quantity: 1, price: 99 },
      { id: 1, name: "California Roll", quantity: 1, price: 95 },
    ],
  },
]

function PreviousOrdersPage() {
  return (
    <section className="prevorder-page-wrapper">
      <h1 className="prevorder-page-title">Previous Orders</h1>
      <section className="prevorder-list-wrapper">
        {previousOrders.map((order) => (
          <PreviousOrderCard key={order.id} order={order} />
        ))}
      </section>
    </section>
  )
}

export default PreviousOrdersPage
