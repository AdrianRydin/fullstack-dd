import ReceiptComponent from "../../components/ReceiptComponent/ReceiptComponent";
import { useLocation } from "react-router-dom";
import { useCartStore } from "../../features/cart/cartStore";
import { useEffect } from "react";
import "./receipt.css";
import { useCheckoutStore } from "../../features/review/reviewStore";

// hämta order med orderId från backend sen?

function Receipt() {
  const { state } = useLocation();
  if (!state) {
    return <p className="recipt-empty">No order found</p>;
  }

  const { items, total, deliveryFee, orderNumber } = state;

  const clearCart = useCartStore((state) => state.clear);
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

  useEffect(() => {
    clearCart();
    resetCheckout();
  }, []);

  return (
    <main className="receipt-page">
      <ReceiptComponent
        orderNumber={orderNumber}
        items={items}
        totalPrice={total}
        deliveryFee={deliveryFee}
      />
    </main>
  );
}

export default Receipt;
