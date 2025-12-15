import { apiFetch } from "./client"

export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  isAvaliable: boolean
  tags?: string[]
  ingredients?: Ingredient[]
}

export type NewMenuItem = Omit<MenuItem, "_id">

export function getMenu() {
  return apiFetch<MenuItem[]>("/menu")
}

export function createMenuItem(data: NewMenuItem) {
  return apiFetch<MenuItem>("/menu", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getMenuItem(menuItemId: string) {
  return apiFetch<MenuItem>(`/menu/${menuItemId}`)
}

export function updateMenuItem(id: string, data: Partial<NewMenuItem>) {
  return apiFetch<MenuItem>(`/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteMenuItem(id: string) {
  return apiFetch<undefined>(`/menu/${id}`, { method: "DELETE" })
}
