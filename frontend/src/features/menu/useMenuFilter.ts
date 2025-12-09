// src/features/menu/useMenuFilter.ts
import { useState, useMemo } from "react"
import type { MenuItem } from "../../api/menu"

export function useMenuFilter(items: MenuItem[]) {
  const [filter, setFilter] = useState<string>("all")

  const filteredMenu = useMemo(() => {
    if (filter === "all") return items

    return items.filter((item) => {
      const category = item.category?.toLowerCase() ?? ""
      return category === filter.toLowerCase()
    })
  }, [filter, items])

  return { filter, setFilter, filteredMenu }
}
