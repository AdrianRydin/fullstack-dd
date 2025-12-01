import CartButton from "../../features/layout/Cart/CartButton"
import { type SushiRoll } from "../../pages/Cart/Cart"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"

import "./CartItemCard.css"

interface CartCardProps {
  item: SushiRoll
  increase: (id: number) => void
  decrease: (id: number) => void
  remove: (id: number) => void
}

function CartItemCard({ item, increase, remove, decrease }: CartCardProps) {
  return (
    <section className="cart-item-card">
      <img src={item.image} />

      <section className="cart-item-inner-wrapper">
        <h1 className="cart-item-name">{item.name}</h1>
        <p className="cart-item-desc">{item.description}</p>

        <section className="cart-item-bottom-wrapper">
          <section className="cart-qty-controls">
            {/* Decrease eller Remove beroende på quantity */}
            {item.quantity > 1 ? (
              <CartButton
                onClick={() => decrease(item.id)}
                icon={<RemoveIcon />}
                ariaLabel="Decrease quantity"
              />
            ) : (
              <CartButton
                onClick={() => remove(item.id)}
                icon={<DeleteIcon />}
                ariaLabel="Remove item"
              />
            )}

            <p className="cart-item-qty">{item.quantity}</p>

            {/* Increase */}
            <CartButton
              onClick={() => increase(item.id)}
              icon={<AddIcon />}
              ariaLabel="Increase quantity"
            />
          </section>

          <p className="cart-item-total">{item.price * item.quantity} kr</p>
        </section>
      </section>
    </section>
  )
}

export default CartItemCard
