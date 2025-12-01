import "./cartlayout.css"
import { type ReactNode } from "react"

interface CartButtonprops {
  onClick: () => void
  ariaLabel: string
  icon: ReactNode
}

function CartButton({ onClick, icon, ariaLabel }: CartButtonprops) {
  return (
    <button className="cart-button" onClick={onClick} aria-label={ariaLabel}>
      {icon}
    </button>
  )
}

export default CartButton
