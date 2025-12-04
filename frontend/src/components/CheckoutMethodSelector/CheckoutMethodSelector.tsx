import { useCheckoutStore } from "../../features/review/reviewStore";
import "./checkoutMethodSelector.css";

function CheckoutMethodSelector() {
  const {
    deliveryMethod,
    paymentMethod,
    setDeliveryMethod,
    setPaymentMethod,
    errors,
  } = useCheckoutStore();

  return (
    <section className="select-section">
      <h3 className="select-subheading">Delivery Method</h3>
      <article className="select-buttons">
        {["home", "pickup"].map((method) => (
          <label className="select-container" key={method}>
            <input
              type="radio"
              name="delivery"
              value={method}
              checked={deliveryMethod === method}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            {method === "home" ? "Delivery" : "Pick up"}
          </label>
        ))}
      </article>
      {errors.deliveryMethod && (
        <p className="error-text">{errors.deliveryMethod}</p>
      )}

      <h3 className="select-subheading">Payment Method</h3>
      <article className="select-buttons">
        {["swish", "card"].map((method) => (
          <label className="select-container" key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method === "swish" ? "Swish" : "Card"}
          </label>
        ))}
      </article>
      {errors.paymentMethod && (
        <p className="error-text">{errors.paymentMethod}</p>
      )}
    </section>
  );
}

export default CheckoutMethodSelector;
