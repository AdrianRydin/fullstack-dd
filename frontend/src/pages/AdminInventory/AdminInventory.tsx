/* import { useInventory } from "../../features/inventory/useInventory"
import "./AdminInventory.css"

function AdminInventoryPage() {
  const items = useInventory()
  return (
    <section className="wrapper">
      <h1 className="title">Inventory</h1>

      <section className="category-card">
        <h2 className="title">Fish and Seafood</h2>
        <section className="titles-wrapper">
          <h3 className="title">Item</h3>
          <h3 className="title">Quantity</h3>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend }
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend }
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          <p>Salmon</p>
          <p>2</p>
        </section>
        <section className="item-wrapper">
          <p>Salmon</p>
          <p>2</p>
        </section>
      </section>

      <section className="category-card">
        <h2 className="title">Rice and base ingredients</h2>
        <section className="titles-wrapper">
          <h3 className="title">Item</h3>
          <h3 className="title">Quantity</h3>
        </section>
        <section className="item-wrapper">
          {/* här ska vi mappa alla items som finns i backend }
          <p>Salmon</p>
          <p>2</p>
        </section>
      </section>
    </section>
  )
}

export default AdminInventoryPage
 */

import { useInventory } from "../../features/inventory/useInventory"
import "./AdminInventory.css"
import type { InventoryItem } from "../../api/inventory"

const categoryLookup: Record<string, string> = {
  salmon: "Fish and Seafood",
  tuna: "Fish and Seafood",
  shrimp: "Fish and Seafood",

  rice: "Rice and Base Ingredients",
  nori: "Rice and Base Ingredients",

  cucumber: "Vegetables",
  avocado: "Vegetables",
  carrot: "Vegetables",

  "sparkling water": "Drinks",
  "sparkling cola drink": "Drinks",
  "strawberry sparkle drink": "Drinks",
  "vanilla fizz drink": "Drinks",
  "green tea": "Drinks",
}

function groupByCategory(items: InventoryItem[]) {
  const groups: Record<string, InventoryItem[]> = {}

  for (const item of items) {
    const category = categoryLookup[item.name.toLowerCase()] || "Uncategorized"

    if (!groups[category]) groups[category] = []
    groups[category].push(item)
  }

  return groups
}

function AdminInventoryPage() {
  const { items } = useInventory()
  const grouped = groupByCategory(items ?? [])

  return (
    <section className="wrapper">
      <h1 className="title">Inventory</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <section className="category-card" key={category}>
          <h2 className="title">{category}</h2>

          <section className="titles-wrapper">
            <h3 className="title">Item</h3>
            <h3 className="title">Quantity</h3>
            <h3 className="title">Unit</h3>
          </section>

          {items.map((item) => (
            <section className="item-wrapper" key={item._id}>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{item.unit}</p>
            </section>
          ))}
        </section>
      ))}
    </section>
  )
}

export default AdminInventoryPage
