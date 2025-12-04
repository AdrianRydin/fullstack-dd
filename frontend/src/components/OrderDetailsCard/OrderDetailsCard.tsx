import { MENU_ITEMS } from "../../pages/__tests__"
import "./OrderDetailsCard.css"

interface OrderDetailsCardProps {
  item: {
    id: number
    name: string
    quantity: number
    price: number
  }
}

function OrderDetailsCard({ item }: OrderDetailsCardProps) {
  //För att få in en bild i detta kortet! Ta bort sen när backend kommer.
  const menuItem = MENU_ITEMS.find((m) => m.name === item.name)

  return (
    <section className="order-details-card">
      {/* Ändra Bild när backend kommer!! */}
      {menuItem && (
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="details-image"
        />
      )}
      <section className="details-text-wrapper">
        <h3 className="details-text-title">{item.name}</h3>
        <p className="details-text-desc"> Item Description here!!</p>
        <p className="details-text-qty">Quantity: {item.quantity}</p>
      </section>
      <p className="details-total-price">{item.price} kr</p>
    </section>
  )
}

export default OrderDetailsCard
