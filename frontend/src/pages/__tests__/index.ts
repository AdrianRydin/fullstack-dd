export type MenuItem = {
  id: string
  name: string
  type: "nigiri" | "maki" | "special" | "drink"
  description: string
  price: number
  image: string
  isFavorite?: boolean
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "sunrise-salmon",
    name: "Sunrise Salmon Roll",
    type: "special",
    description: "Salmon, rice, lax, räka",
    price: 179,
    image: "/src/assets/Sushi-plate2.png",
    isFavorite: true,
  },
  {
    id: "spicy-tuna",
    name: "Spicy Tuna Roll",
    type: "special",
    description: "Sushi rice, nori, fresh tuna, spicy mayo",
    price: 179,
    image: "/src/assets/Sushi-plate3.png",
    isFavorite: true,
  },
  {
    id: "umami-mix",
    name: "Umami Mix Platter",
    type: "special",
    description: "A mix of our signature rolls",
    price: 299,
    image: "/src/assets/Sushi-plate4.png",
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight Roll",
    type: "nigiri",
    description: "Cucumber, avocado, carrot, and asparagus",
    price: 149,
    image: "/src/assets/Sushi-plate5.png",
  },
  {
    id: "tempura-shrimp",
    name: "Tempura Shrimp Roll",
    type: "nigiri",
    description: "Crispy shrimp tempura with avocado and spicy mayo",
    price: 189,
    image: "/src/assets/Sushi-plate6.png",
  },
]
