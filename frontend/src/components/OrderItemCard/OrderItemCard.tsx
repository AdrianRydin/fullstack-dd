import "../CartItemCard/CartItemCard.css"
import type { CartItem } from "../../features/cart/cartTypes"

interface OrderItemCardProps {
  item: CartItem;
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
