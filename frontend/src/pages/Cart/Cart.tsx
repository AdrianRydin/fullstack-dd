import CartItemCard from "../../components/CartItemCard/CartItemCard"
import Button from "../../components/Button/Button"
import "./cart.css"

import { useState } from "react"

// data/sushiRolls.ts
export interface SushiRoll {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

// Fake data tills backend finns
const sushiRolls: SushiRoll[] = [
  {
    id: 1,
    name: "California Roll",
    description: "Krabba, avokado och gurka",
    price: 95,
    quantity: 2,
    image: "src/assets/Sushi-plate2.png",
  },
  {
    id: 2,
    name: "Spicy Tuna Roll",
    description: "Tunna bitar av tonfisk med spicy mayo",
    price: 109,
    quantity: 1,
    image: "src/assets/Sushi-plate1.png",
  },
  {
    id: 3,
    name: "Salmon Avocado Roll",
    description: "Lax och färsk avokado",
    price: 99,
    quantity: 3,
    image: "src/assets/Sushi-plate3.png",
  },
  {
    id: 4,
    name: "Salmon Avocado Roll",
    description: "Lax och färsk avokado",
    price: 99,
    quantity: 3,
    image: "src/assets/Sushi-plate4.png",
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
  const [items, setItems] = useState<SushiRoll[]>(sushiRolls)

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Räknar total pris
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <>
      <section className="cart-page-wrapper">
        <section className="cart-list-wrapper">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              increase={increase}
              decrease={decrease}
              remove={removeItem}
            />
          ))}
        </section>

        <section className="cart-total-wrapper">
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Items</p>
            <p className="cart-total-small-text">{total} kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Delivery</p>
            <p className="cart-total-small-text">49 kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-big-text">Total</p>
            <p className="cart-total-big-text">{total + 49}</p>
          </section>
        </section>

        <Button text="Review Order" />
      </section>
    </>
  )
}
