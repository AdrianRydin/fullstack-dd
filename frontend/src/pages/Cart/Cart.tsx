import CartItemCard from "../../components/CartItemCard/CartItemCard"
import Button from "../../components/Button/Button"
import "./cart.css"

// data/sushiRolls.ts
export interface SushiRoll {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

const sushiRolls: SushiRoll[] = [
  {
    id: 1,
    name: "California Roll",
    description: "Krabba, avokado och gurka",
    price: 95,
    quantity: 2,
    image: "/images/sushi/california.jpg",
  },
  {
    id: 2,
    name: "Spicy Tuna Roll",
    description: "Tunna bitar av tonfisk med spicy mayo",
    price: 109,
    quantity: 1,
    image: "/images/sushi/spicy-tuna.jpg",
  },
  {
    id: 3,
    name: "Salmon Avocado Roll",
    description: "Lax och färsk avokado",
    price: 99,
    quantity: 3,
    image: "/images/sushi/salmon-avocado.jpg",
  },
  {
    id: 4,
    name: "Salmon Avocado Roll",
    description: "Lax och färsk avokado",
    price: 99,
    quantity: 3,
    image: "/images/sushi/salmon-avocado.jpg",
  },
  {
    id: 5,
    name: "Salmon Avocado Roll",
    description: "Lax och färsk avokado",
    price: 99,
    quantity: 3,
    image: "/images/sushi/salmon-avocado.jpg",
  },
]

export default function Cart() {
  return (
    <>
      <section className="cart-page-wrapper">
        <section className="cart-list-wrapper">
          {sushiRolls.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </section>

        <section className="cart-total-wrapper">
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Items</p>
            <p className="cart-total-small-text">245 kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Delivery</p>
            <p className="cart-total-small-text">49 kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-big-text">Total</p>
            <p className="cart-total-big-text">1345 kr</p>
          </section>
        </section>

        <Button text="Review Order" />
      </section>
    </>
  )
}
