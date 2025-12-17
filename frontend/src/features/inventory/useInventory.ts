import { useEffect, useState } from "react"
import { getInventory, type InventoryItem } from "../../api/inventory"

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    getInventory()
      .then((data) => {
        setItems(data)
      })
      .catch((err) => console.error("Failed to load inventory:", err))
  }, [])

  return { items }
}
