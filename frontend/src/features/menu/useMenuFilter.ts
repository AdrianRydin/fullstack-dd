import { useState, useMemo } from "react"
import { type MenuItem } from "../../pages/__tests__"

export function useMenuFilter(items: MenuItem[]) {
  const [filter, setFilter] = useState<string>("all")

  const filteredMenu = useMemo(() => {
    if (filter === "all") return items
    return items.filter(
      (item) => item.type.toLowerCase() === filter.toLowerCase()
    )
  }, [filter, items])

  console.log("Filter value:", filter)
  console.log(
    "Item types:",
    items.map((i) => i.type)
  )

  return { filter, setFilter, filteredMenu }
}
