import AddressForm from "../../components/AddressForm/AddressForm";
import Button from "../../components/Button/Button";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard";
import "./review.css";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutMethodSelector from "../../components/CheckoutMethodSelector/CheckoutMethodSelector";
import SummaryBox from "../../components/SummaryBox/SummaryBox";
import { validateOrder } from "../../utils/validateOrder";
import { useCheckoutStore } from "../../features/review/reviewStore";
import { useCart } from "../../features/cart/useCart";
import { createOrder, updateOrder } from "../../api/orders";

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingOrderId =
    (location.state as { editingOrderId?: string } | null)
      ?.editingOrderId;

  const { items, totalPrice, clear } = useCart();
  const {
    personalInfo,
    deliveryMethod,
    paymentMethod,
    setErrors,
    resetCheckout,
  } = useCheckoutStore();

  const deliveryFee = deliveryMethod === "home" ? 49 : 0;
  const total = totalPrice + deliveryFee;

  const handleConfirm = async () => {
    const validation = validateOrder({
      personalInfo,
      deliveryMethod,
      paymentMethod,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    if (items.length === 0) {
      return;
    }
    
    const itemPayload = {
      items: items.map((item) => ({
        menuItemId: item.id,
        qty: item.quantity,
      })),
    };

    const createPayload = {
      ...itemPayload,
      customerName: personalInfo.name,
      customerPhone: personalInfo.phone,
    };

    try {
      const order = editingOrderId
        ? await updateOrder(editingOrderId, itemPayload)
        : await createOrder(createPayload);

      const orderData = {
        orderId: order._id,
        orderStatus: order.status,
        orderCreatedAt: order.createdAt,
        items,
        deliveryFee,
        total,
      };

      clear();
      resetCheckout();

      navigate("/receipt", { state: orderData });
    } catch (err) {
      console.error("Failed to submit order", err);
      alert(
        "Could not submit order. It may already be locked or there was a server error."
      );
    }
  };

  return (
    <main className="review-page">
      <h1 className="review-heading">Checkout</h1>
      <section className="review-container">
        <section className="review-list-wrapper">
          <h3 className="review-subheading">Order information</h3>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item) => <OrderItemCard key={item.id} item={item} />)
          )}
        </section>
      </section>

      <AddressForm />
      <CheckoutMethodSelector />
      <SummaryBox
        totalPrice={totalPrice}
        deliveryFee={deliveryFee}
        total={total}
      />
      <Button text="Confirm" type="button" onClick={handleConfirm} />
    </main>
  );
}

export default Review;
