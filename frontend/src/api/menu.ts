import { apiFetch } from "./client"

export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  isAvaliable: boolean
  tags?: string[]
  ingredients?: string[]
}

export type NewMenuItem = Omit<MenuItem, "_id">

export function getMenu() {
  return apiFetch<MenuItem[]>("/menu")
}

export function createMenuItem(data: NewMenuItem, token: string) {
  return apiFetch<MenuItem>(
    "/menu",
    { method: "POST", body: JSON.stringify(data) },
    token
  )
}

export function updateMenuItem(
  id: string,
  data: Partial<NewMenuItem>,
  token: string
) {
  return apiFetch<MenuItem>(
    `/menu/${id}`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  )
}

export function deleteMenuItem(id: string, token: string) {
  return apiFetch<undefined>(`/menu/${id}`, { method: "DELETE" }, token)
}
