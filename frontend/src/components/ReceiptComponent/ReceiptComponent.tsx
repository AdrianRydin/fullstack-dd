import { useEffect, useState } from "react";
import "./receiptComponent.css";
import logo from "../../assets/logo-full-transparent.png";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import type { CartItem } from "../../features/cart/cartTypes";
import { getOrder, cancelOrder } from "../../api/order";
import type { OrderStatus } from "../../api/order";
import { useCartStore } from "../../features/cart/cartStore";
import { useAuthStore } from "../../features/authentication/store/authStore";

interface ReceiptComponentProps {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  initialStatus?: OrderStatus;
  createdAt?: string;
}

function ReceiptComponent({
  orderId,
  items,
  totalPrice,
  deliveryFee,
  initialStatus = "PENDING",
  createdAt,
}: ReceiptComponentProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const setCartItems = useCartStore((s) => s.setItems);
  const {token}=useAuthStore()

  // hämta status från backend
  useEffect(() => {
  let cancelled = false;

  async function fetchStatus() {
    try {
      const order = await getOrder(orderId, token || undefined);
      if (!cancelled) {
        setStatus(order.status);
      }
    } catch (err) {
      console.error("Failed to fetch order status", err);
    }
  }

  fetchStatus();
  const intervalId = setInterval(fetchStatus, 5000);

  return () => {
    cancelled = true;
    clearInterval(intervalId);
  };
}, [orderId, token]);

  const shortOrderNumber =
    orderId?.slice(-6)?.toUpperCase() ?? "??????";

  const dateString = createdAt
    ? new Date(createdAt).toLocaleString()
    : new Date().toLocaleString();

  const statusConfig = {
    PENDING: {
      label: "Status: Pending (Waiting)",
      className: "receipt-status--pending",
    },
    LOCKED: {
      label: "Status: Order locked",
      className: "receipt-status--locked",
    },
    READY: {
      label: "Status: Ready for delivery",
      className: "receipt-status--ready",
    },
    CANCELLED: {
      label: "Status: Canceled",
      className: "receipt-status--cancelled",
    },
  }[status];

  const handleEditOrder = () => {
    setCartItems(items);
    navigate("/Cart", { state: { editingOrderId: orderId } });
  };

  const handleMyOrdersClick = () => {
  navigate("/previous-orders");
};

const handleCancelOrder = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this order?"
  );
  if (!confirmed) return;

  try {
    const updated = await cancelOrder(orderId, token || undefined);
    setStatus(updated.status); // blir "CANCELLED"
    alert("Your order has been cancelled.");
  } catch (err) {
    console.error("Failed to cancel order", err);
    alert(
      "Could not cancel the order. It may already be locked or processed."
    );
  }
};

  return (
    <section className="receipt-component">
      <img src={logo} alt="Umami Logo" className="receipt-logo" />
      <article className="receipt-top">
        <h1 className="receipt-heading">Thank you for your order!</h1>
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
          <p key={item.id} className="receipt-text">
            {item.name} × {item.quantity} —{" "}
            {(item.price * item.quantity).toFixed(0)} kr
          </p>
        ))}
        <p className="receipt-text">Delivery Fee: {deliveryFee} kr</p>
        <h2 className="receipt-total">Total: {totalPrice} kr</h2>
      </article>

     {status === "PENDING" && (
        <>
          <Button text="Edit order" onClick={handleEditOrder} />
          <Button text="Cancel order" onClick={handleCancelOrder} />
        </>
      )}

      <Button text="My orders" onClick={handleMyOrdersClick} />
      <Button text="Home" onClick={() => navigate("/")} />
    </section>
  );
}

export default ReceiptComponent;