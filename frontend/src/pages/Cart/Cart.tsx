import CartItemCard from "../../components/CartItemCard/CartItemCard";
import Button from "../../components/Button/Button";
import "./cart.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../features/cart/useCart";
import { updateOrder } from "../../api/orders";
import { useCheckoutStore } from "../../features/review/reviewStore";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingOrderId =
    (location.state as { editingOrderId?: string } | null)
      ?.editingOrderId;

  const { items, increase, decrease, remove, totalPrice } = useCart();
  const { deliveryMethod } = useCheckoutStore();

  const deliveryFee = deliveryMethod === "home" ? 49 : 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  const handleUpdateOrder = async () => {
    if (!editingOrderId) return;
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const payload = {
      items: items.map((item) => ({
        menuItemId: item.id,
        qty: item.quantity,
      })),
    };

    try {
      const order = await updateOrder(editingOrderId, payload);

      const backendTotal = order.totalPrice;
      const fee = deliveryMethod === "home" ? 49 : 0;
      const total = backendTotal + fee;

      navigate("/receipt", {
        state: {
          orderId: order._id,
          orderStatus: order.status,
          orderCreatedAt: order.createdAt,
          items,
          deliveryFee: fee,
          total,
        },
      });
    } catch (err) {
      console.error("Failed to update order", err);
      alert(
        "Could not update order. It may already be locked or there was a server error."
      );
    }
  };

  return (
    <section className="cart-page-wrapper">
      <h1 className="cart-page-title">Cart</h1>

      <section className="cart-list-wrapper">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              increase={() => increase(item.id)}
              decrease={() => decrease(item.id)}
              remove={() => remove(item.id)}
            />
          ))
        )}
      </section>

      <section className="cart-total-wrapper">
        <section className="cart-price-grouping">
          <p className="cart-total-small-text">Items</p>
          <p className="cart-total-small-text">{totalPrice} kr</p>
        </section>
        <section className="cart-price-grouping">
          <p className="cart-total-small-text">Delivery</p>
          <p className="cart-total-small-text">{deliveryFee} kr</p>
        </section>
        <section className="cart-price-grouping">
          <p className="cart-total-big-text">Total</p>
          <p className="cart-total-big-text">{totalWithDelivery}</p>
        </section>
      </section>

      <section className="cart-button-wrapper">
        {editingOrderId ? (
          <Button text="Confirm changes" onClick={handleUpdateOrder} />
        ) : (
          <Button
            text="Checkout"
            onClick={() => navigate("/review")}
          />
        )}
      </section>
    </section>
  );
}
