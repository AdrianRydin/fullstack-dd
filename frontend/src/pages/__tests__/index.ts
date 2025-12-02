export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFavorite?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "sunrise-salmon",
    name: "Sunrise Salmon Roll",
    description: "Salmon, rice, lax, räka",
    price: 179,
    image: "/src/assets/Sushi-plate2.png",
    isFavorite: true,
  },
  {
    id: "spicy-tuna",
    name: "Spicy Tuna Roll",
    description: "Sushi rice, nori, fresh tuna, spicy mayo",
    price: 179,
    image: "/src/assets/Sushi-plate3.png",
    isFavorite: true,
  },
  {
    id: "umami-mix",
    name: "Umami Mix Platter",
    description: "A mix of our signature rolls",
    price: 299,
    image: "/src/assets/Sushi-plate4.png",
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight Roll",
    description: "Cucumber, avocado, carrot, and asparagus",
    price: 149,
    image: "/src/assets/Sushi-plate2.png",
  },
];