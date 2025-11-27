import IncreaseButton from "../../features/layout/Cart/IncreaseButton"
import { type SushiRoll } from "../../pages/Cart/Cart"

import "./CartItemCard.css"

interface Props {
  item: SushiRoll
}

function CartItemCard({ item }: Props) {
  return (
    <section className="cart-item-card">
      <img src={item.image} />

      <section className="cart-item-inner-wrapper">
        <h1 className="cart-item-name">{item.name}</h1>
        <p className="cart-item-desc">{item.description}</p>

        <section className="cart-item-bottom-wrapper">
          <section className="cart-qty-controls">
            <IncreaseButton />
            <p className="cart-item-qty">{item.quantity}</p>
            <IncreaseButton />
          </section>
          <p className="cart-item-total">239 kr</p>
        </section>
      </section>
    </section>
  )
}

export default CartItemCard
