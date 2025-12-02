import CartItemCard from "../../components/CartItemCard/CartItemCard";
import Button from "../../components/Button/Button";
import "./cart.css";

import { useEffect } from "react"

import { useCart } from "../../features/cart/useCart"
import { useNavigate } from "react-router-dom";

// data/sushiRolls.ts
export interface SushiRoll {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
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
];

export default function Cart() {
  const navigate = useNavigate();
  const { items, increase, decrease, remove, totalPrice, setItems } = useCart()

  useEffect(() => {
    setItems(sushiRolls)
  }, [])

  return (
    <>
      <section className="cart-page-wrapper">
        <section className="cart-list-wrapper">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              increase={() => increase(item.id)}
              decrease={() => decrease(item.id)}
              remove={() => remove(item.id)}
            />
          ))}
        </section>

        <section className="cart-total-wrapper">
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Items</p>
            <p className="cart-total-small-text">{totalPrice} kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-small-text">Delivery</p>
            <p className="cart-total-small-text">49 kr</p>
          </section>
          <section className="cart-price-grouping">
            <p className="cart-total-big-text">Total</p>
            <p className="cart-total-big-text">{totalPrice + 49}</p>
          </section>
        </section>

        <Button text="Review Order" onClick={() => navigate("/review")}/>
      </section>
    </>
  );
}
