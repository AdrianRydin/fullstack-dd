import "../../components/ReceiptComponent/receiptComponent.css"
import logo from "../../assets/logo-full-transparent.png"
import { useNavigate } from "react-router-dom"

import type { OrderItemResponse, OrderStatus } from "../../api/order"
import { getMenuItem } from "../../api/menu"
import { useCart } from "../../features/cart/useCart"

import Button from "../Button/Button"

interface OrderDetailsReceiptProps {
  orderId: string
  items: OrderItemResponse[]
  totalPrice: number
  createdAt: string
  status: OrderStatus
}

function OrderDetailsReceipt({
  orderId,
  items,
  totalPrice,
  createdAt,
  status,
}: OrderDetailsReceiptProps) {
  const navigate = useNavigate()
  const { clear, addToCart } = useCart()

  const shortOrderNumber = orderId?.slice(-6)?.toUpperCase() ?? "??????"
  const dateString = new Date(createdAt).toLocaleString()

  const statusConfig = {
    PENDING: {
      label: "Status: Mottagen (väntar)",
      className: "receipt-status--pending",
    },
    LOCKED: {
      label: "Status: Låst – tillagas",
      className: "receipt-status--locked",
    },
    READY: {
      label: "Status: Klar för upphämtning",
      className: "receipt-status--ready",
    },
    CANCELLED: {
      label: "Status: Avbruten",
      className: "receipt-status--cancelled",
    },
  }[status]

  const handleOrderAgain = async () => {
    clear()

    for (const item of items) {
      try {
        const menuItem = await getMenuItem(item.menuItemId)

        addToCart({
          id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.qty,
          description: menuItem.description,
          image: menuItem.imageUrl ?? "",
        })
      } catch (err) {
        console.error("Failed to fetch menu item", err)
      }
    }

    navigate("/cart")
  }

  return (
    <section className="receipt-component">
      <img src={logo} alt="Umami Logo" className="receipt-logo" />

      <article className="receipt-top">
        <h1 className="receipt-heading">Order details</h1>
        <p className="receipt-ordernumber">Ordernumber: #{shortOrderNumber}</p>
        <p className="receipt-date">Date: {dateString}</p>

        <p className={`receipt-status-badge ${statusConfig.className}`}>
          <span className="receipt-status-dot" />
          <span>{statusConfig.label}</span>
        </p>
      </article>

      <article className="receipt-bottom">
        <h3 className="receipt-subheading">Your order</h3>
        {items.map((item) => (
          <p key={item.menuItemId} className="receipt-text">
            {item.name} × {item.qty} — {(item.price * item.qty).toFixed(0)} kr
          </p>
        ))}

        <h2 className="receipt-total">Total: {totalPrice} kr</h2>
      </article>
      <Button text="Order Again" onClick={handleOrderAgain}></Button>
      <Button text="My orders" onClick={() => navigate("/previous-orders")} />
    </section>
  )
}

export default OrderDetailsReceipt
