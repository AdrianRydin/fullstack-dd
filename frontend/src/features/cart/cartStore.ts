import { create } from "zustand"
import type { CartItem } from "./cartTypes"

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  setItems: (items: CartItem[]) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addToCart: (item) => {
    const items = get().items
    const exists = items.find((i) => i.id === item.id)
    const newItems = exists
      ? items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      : [...items, item]
    set({ items: newItems })
  },

  increase: (id: string) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    )
    set({ items: newItems })
  },

  decrease: (id: string) => {
    const newItems = get()
      .items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
      .filter((i) => i.quantity > 0)
    set({ items: newItems })
  },

  remove: (id: string) => {
    const newItems = get().items.filter((i) => i.id !== id)
    set({ items: newItems })
  },

  clear: () => set({ items: [] }),
}))
