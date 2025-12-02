import "../CartItemCard/CartItemCard.css";
import { type SushiRoll } from "../../pages/Cart/Cart";

interface OrderItemCardProps {
  item: SushiRoll;
}

function OrderItemCard({ item }: OrderItemCardProps) {
  return (
    <section className="cart-item-card cart-item-card--readonly">
      <img src={item.image} alt={item.name} />
      <section className="cart-item-inner-wrapper">
        <h1 className="cart-item-name">{item.name}</h1>
        <p className="cart-item-desc">{item.description}</p>
        <article className="cart-item-bottom-wrapper">
          <p className="cart-item-qty">Quantity: {item.quantity}</p>
          <p className="cart-item-total">{item.price * item.quantity} kr</p>
        </article>
      </section>
    </section>
  );
}

export default OrderItemCard;
