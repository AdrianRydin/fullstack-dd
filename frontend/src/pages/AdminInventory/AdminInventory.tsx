import { useAdminRedirect } from "../../features/authentication/hooks/useAdminRedirect"
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
  mango: "Vegetables",

  "spicy mayo": "Condiments",

  "sparkling water": "Drinks",
  "sparkling cola drink": "Drinks",
  "strawberry sparkle drink": "Drinks",
  "vanilla fizz drink": "Drinks",
  "green tea": "Drinks",
  "still water": "Drinks",
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
  const isAdmin = useAdminRedirect()
  if (!isAdmin) return null

  const { items } = useInventory()
  const grouped = groupByCategory(items ?? [])

  return (
    <section className="wrapper">
      <h1 className="title">Inventory</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <section className="category-card" key={category}>
          <h2 className="title title-category">{category}</h2>

          <section className="titles-wrapper">
            <h3 className="title">Quantity</h3>
          </section>

          {items.map((item) => (
            <section className="item-wrapper" key={item._id}>
              <p>{item.name}</p>
              <p>
                {item.quantity} {item.unit}
              </p>
            </section>
          ))}
        </section>
      ))}
    </section>
  )
}

export default AdminInventoryPage
