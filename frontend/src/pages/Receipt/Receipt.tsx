import ReceiptComponent from "../../components/ReceiptComponent/ReceiptComponent";
import { useLocation } from "react-router-dom";
import { useCartStore } from "../../features/cart/cartStore";
import { useEffect } from "react";
import "./receipt.css";
import type { CartItem } from "../../features/cart/cartTypes";
import type { OrderStatus } from "../../api/orders";

type ReceiptState = {
  orderId: string;
  orderStatus?: OrderStatus;
  orderCreatedAt?: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
};

function Receipt() {
  const { state } = useLocation();
  const clearCart = useCartStore((s) => s.clear);

  useEffect(() => {
  clearCart();
}, [clearCart]);

  if (!state) {
    return <p className="recipt-empty">No order found</p>;
  }

  const {
    orderId,
    orderStatus,
    orderCreatedAt,
    items,
    total,
    deliveryFee,
  } = state as ReceiptState;

  return (
    <main className="receipt-page">
      <ReceiptComponent
        orderId={orderId}
        initialStatus={orderStatus}
        createdAt={orderCreatedAt}
        items={items}
        totalPrice={total}
        deliveryFee={deliveryFee}
      />
    </main>
  );
}

export default Receipt;

