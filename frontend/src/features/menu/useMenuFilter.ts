import { useState, useMemo } from "react"
import type { MenuItem } from "../../api/menu"

export function useMenuFilter(items: MenuItem[]) {
  const [filter, setFilter] = useState<string>("all")

  const filteredMenu = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const catA = (a.category || "").toLowerCase()
      const catB = (b.category || "").toLowerCase()

      const isDrinkA = catA === "drinks"
      const isDrinkB = catB === "drinks"

      if (isDrinkA && !isDrinkB) return 1
      if (!isDrinkA && isDrinkB) return -1
      return 0
    })

    const normalizedFilter = filter.toLowerCase()
    if (normalizedFilter === "all") return sorted
    if (normalizedFilter === "drink" || normalizedFilter === "drinks") {
      return sorted.filter(
        (item) => (item.category || "").toLowerCase() === "drinks"
      )
    }

    return sorted.filter((item) => {
      const category = (item.category || "").toLowerCase()
      if (category === "drinks") return false

      const tags = item.tags?.map((t) => t.toLowerCase()) ?? []
      return tags.includes(normalizedFilter)
    })
  }, [filter, items])

  return { filter, setFilter, filteredMenu }
}
