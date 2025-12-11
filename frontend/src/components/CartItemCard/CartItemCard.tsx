import CartButton from "../../features/layout/Cart/CartButton";
import type { CartItem } from "../../features/cart/cartTypes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import "./CartItemCard.css";

interface CartCardProps {
  item: CartItem;
  increase: () => void;
  decrease: () => void;
  remove: () => void;
}

function CartItemCard({ item, increase, remove, decrease }: CartCardProps) {
  return (
    <section className="cart-item-card">
      <img src={item.image} alt={item.name} />

      <section className="cart-item-inner-wrapper">
        <h1 className="cart-item-name">{item.name}</h1>
        <p className="cart-item-desc">{item.description}</p>

        <section className="cart-item-bottom-wrapper">
          <section className="cart-qty-controls">
            {/* Decrease eller Remove beroende på quantity */}
            {item.quantity > 1 ? (
              <CartButton
                onClick={decrease}
                icon={<RemoveIcon />}
                ariaLabel="Decrease quantity"
              />
            ) : (
              <CartButton
                onClick={remove}
                icon={<DeleteIcon />}
                ariaLabel="Remove item"
              />
            )}

            <p className="cart-item-qty">{item.quantity}</p>

            {/* Increase */}
            <CartButton
              onClick={increase}
              icon={<AddIcon />}
              ariaLabel="Increase quantity"
            />
          </section>

          <p className="cart-item-total">
            {item.price * item.quantity} kr
          </p>
        </section>
      </section>
    </section>
  );
}

export default CartItemCard;
