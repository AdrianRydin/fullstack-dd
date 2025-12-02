import AddressForm from "../../components/AddressForm/AddressForm";
import Button from "../../components/Button/Button";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard";
import "./review.css";
import { useNavigate } from "react-router-dom";
import CheckoutMethodSelector from "../../components/CheckoutMethodSelector/CheckoutMethodSelector";
import SummaryBox from "../../components/SummaryBox/SummaryBox";
import { validateOrder } from "../../utils/validateOrder";
import { useCheckoutStore } from "../../features/review/reviewStore";
import { useCartStore } from "../../features/cart/cartStore";


function Review() {
  const navigate = useNavigate();
  const { items, clear } = useCartStore();
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { personalInfo, deliveryMethod, paymentMethod } = useCheckoutStore();
  const deliveryFee = deliveryMethod === "home" ? 49 : 0;
  const total = totalPrice + deliveryFee;

  const handleConfirm = () => {
    const validation = validateOrder({
      personalInfo,
      deliveryMethod,
      paymentMethod,
    });

    if (!validation.valid) {
      return;
    }

    const orderData = {
      items,
      personalInfo,
      deliveryMethod,
      paymentMethod,
      deliveryFee,
      total,
      orderNumber: Math.floor(Math.random() * 100000),
    };
    clear();
    navigate("/receipt", { state: orderData });
  };

  return (
    <main className="review-page">
      <h1 className="review-heading">Review your order</h1>
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
      <SummaryBox totalPrice={totalPrice} deliveryFee={deliveryFee} total={total} />
      <Button text="Confirm" type="button" onClick={handleConfirm} />
    </main>
  );
}

export default Review;
