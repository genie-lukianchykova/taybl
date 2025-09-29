import { IMenuItem } from './interfaces';

export const MENU_ITEMS: IMenuItem[] = [
  // Drinks
  { id: 1, name: "Espresso", price: 2.50, category: "drinks" },
  { id: 2, name: "Americano", price: 3.00, category: "drinks"},
  { id: 3, name: "Cappuccino", price: 3.50, category: "drinks"},
  { id: 4, name: "Latte", price: 4.00, category: "drinks"},
  { id: 5, name: "Mocha", price: 4.50, category: "drinks"},
  
  // Food
  { id: 6, name: "Croissant", price: 2.00, category: "food"},
  { id: 7, name: "Bagel", price: 2.50, category: "food"},
  { id: 8, name: "Sandwich", price: 6.00, category: "food"},
  
  // Desserts
  { id: 9, name: "Muffin", price: 2.50, category: "desserts"},
  { id: 10, name: "Cookie", price: 1.50, category: "desserts"},
];

export const getMenuByCategory = (category: IMenuItem['category']) => {
  return MENU_ITEMS.filter(item => item.category === category);
};

export const getMenuItemById = (id: number) => {
  return MENU_ITEMS.find(item => item.id === id);
};
