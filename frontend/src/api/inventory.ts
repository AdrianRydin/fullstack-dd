import { apiFetch } from "./client"

export interface InventoryItem {
  _id: string
  name: string
  quantity: number
  unit: string
}

export function getInventory() {
  return apiFetch<InventoryItem[]>("/inventory")
}
