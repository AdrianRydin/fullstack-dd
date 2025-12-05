export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isFavorite?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Sunrise Salmon Roll",
    description: "Salmon, rice, lax, räka",
    price: 179,
    image: "/src/assets/Sushi-plate2.png",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Spicy Tuna Roll",
    description: "Sushi rice, nori, fresh tuna, spicy mayo",
    price: 179,
    image: "/src/assets/Sushi-plate3.png",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Umami Mix Platter",
    description: "A mix of our signature rolls",
    price: 299,
    image: "/src/assets/Sushi-plate4.png",
  },
  {
    id: 4,
    name: "Veggie Delight Roll",
    description: "Cucumber, avocado, carrot, and asparagus",
    price: 149,
    image: "/src/assets/Sushi-plate5.png",
  },
  {
    id: 5,
    name: "Tempura Shrimp Roll",
    description: "Crispy shrimp tempura with avocado and spicy mayo",
    price: 189,
    image: "/src/assets/Sushi-plate6.png",
  }
];