import { useCartStore } from "./cartStore"

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addToCart = useCartStore((s) => s.addToCart)
  const increase = useCartStore((s) => s.increase)
  const decrease = useCartStore((s) => s.decrease)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)
  const setItems = useCartStore((s) => s.setItems)

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return {
    items,
    addToCart,
    increase,
    decrease,
    remove,
    clear,
    setItems,
    totalPrice,
  }
}
