export const dishes = [
  { id: "doro-wat", name: "Doro Wat", category: "Ethiopian", price: 550, icon: "🍗", description: "Slow-cooked chicken, boiled egg, and berbere served with injera.", ingredients: ["Chicken", "Berbere", "Egg", "Injera"] },
  { id: "beyaynetu", name: "Beyaynetu", category: "Ethiopian", price: 350, icon: "🥗", description: "A colorful platter of vegetarian stews served over fresh injera.", ingredients: ["Injera", "Misir Wat", "Shiro", "Gomen"] },
  { id: "shekla-tibs", name: "Shekla Tibs", category: "Ethiopian", price: 550, icon: "🥘", description: "Sizzling beef cubes with onions, peppers, and rosemary.", ingredients: ["Beef", "Onions", "Peppers", "Rosemary"] },
  { id: "kitfo", name: "Kitfo", category: "Ethiopian", price: 450, icon: "🥩", description: "Tender minced beef seasoned with niter kibbeh and mitmita.", ingredients: ["Beef", "Niter Kibbeh", "Mitmita", "Ayib"] },
  { id: "margherita-pizza", name: "Margherita Pizza", category: "Pizza", price: 500, icon: "🍕", description: "Stone-baked crust with tomato, mozzarella, and fresh basil.", ingredients: ["Tomato", "Mozzarella", "Basil", "Olive Oil"] },
  { id: "cheese-burger", name: "Cheese Burger", category: "Burgers", price: 400, icon: "🍔", description: "A juicy beef patty with cheddar, fresh vegetables, and house sauce.", ingredients: ["Beef", "Cheddar", "Lettuce", "House Sauce"] },
  { id: "garlic-bread", name: "Garlic Bread", category: "Sides", price: 150, icon: "🥖", description: "Toasted baguette brushed with garlic butter and parsley.", ingredients: ["Baguette", "Garlic Butter", "Parsley"] },
  { id: "macchiato", name: "Macchiato", category: "Drinks", price: 80, icon: "☕", description: "Rich espresso layered with steamed milk and soft foam.", ingredients: ["Espresso", "Milk", "Milk Foam"] },
];

export function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}

export function getCategories() {
  return ["All", ...new Set(dishes.map((dish) => dish.category))];
}