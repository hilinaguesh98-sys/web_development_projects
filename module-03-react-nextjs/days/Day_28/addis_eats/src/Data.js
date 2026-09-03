const dishes = [
  {
    id: "item-1",
    name: "Cheese Burger",
    category: "burgers",
    spicy: false,
    price: 400,
    description:
      "Juicy beef patty topped with melted cheddar cheese and fresh veggies.",
    ingredients: [
      "Beef Patty",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Burger Bun",
      "House Sauce",
    ],
  },

  {
    id: "item-2",
    name: "Beef Burger",
    category: "burgers",
    spicy: false,
    price: 350,
    description:
      "Grilled classic beef patty served with lettuce, tomato, and house sauce.",
    ingredients: [
      "Beef Patty",
      "Lettuce",
      "Tomato",
      "Pickles",
      "Burger Bun",
      "House Sauce",
    ],
  },

  {
    id: "item-3",
    name: "Double Bacon Cheeseburger",
    category: "burgers",
    spicy: true,
    price: 550,
    description:
      "Two seasoned beef patties layered with crispy bacon and double cheese.",
    ingredients: [
      "Beef Patties",
      "Crispy Bacon",
      "Cheddar Cheese",
      "Lettuce",
      "Burger Bun",
      "House Sauce",
    ],
  },

  {
    id: "item-4",
    name: "Margherita Pizza",
    category: "pizza",
    spicy: false,
    price: 500,
    description:
      "Freshly baked pizza topped with savory tomato sauce and mozzarella cheese.",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella Cheese",
      "Fresh Basil",
      "Olive Oil",
    ],
  },

  {
    id: "item-5",
    name: "Beef Pepperoni Pizza",
    category: "pizza",
    spicy: true,
    price: 600,
    description:
      "Classic stone-baked crust topped with sliced beef pepperoni and extra cheese.",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella Cheese",
      "Beef Pepperoni",
    ],
  },

  {
    id: "item-6",
    name: "Veggie Pizza",
    category: "pizza",
    spicy: false,
    price: 520,
    description:
      "Loaded with bell peppers, onions, olives, mushrooms, and mozzarella.",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella Cheese",
      "Bell Peppers",
      "Onions",
      "Black Olives",
      "Mushrooms",
    ],
  },

  {
    id: "item-7",
    name: "Doro Wat",
    category: "ethiopian",
    spicy: true,
    price: 550,
    description:
      "A traditional Ethiopian slow-cooked chicken stew with boiled eggs and injera.",
    ingredients: [
      "Chicken",
      "Berbere",
      "Onions",
      "Garlic",
      "Ginger",
      "Hard-boiled Egg",
      "Niter Kibbeh",
      "Injera",
    ],
  },

  {
    id: "item-8",
    name: "Beyaynetu",
    category: "ethiopian",
    spicy: false,
    price: 350,
    description:
      "A traditional Ethiopian platter featuring a colorful variety of vegan stews.",
    ingredients: [
      "Injera",
      "Misir Wat",
      "Kik Alicha",
      "Gomen",
      "Shiro",
      "Atakilt Wat",
      "Beetroot",
    ],
  },

  {
    id: "item-9",
    name: "Tibs",
    category: "ethiopian",
    spicy: false,
    price: 450,
    description:
      "Sautéed beef strips seasoned with onions, garlic, rosemary, and green peppers.",
    ingredients: [
      "Beef Strips",
      "Onions",
      "Jalapeño",
      "Garlic",
      "Rosemary",
      "Niter Kibbeh",
      "Injera",
    ],
  },

  {
    id: "item-10",
    name: "Shiro Wat",
    category: "ethiopian",
    spicy: false,
    price: 350,
    description:
      "A rich and savory chickpea flour stew served bubbling hot with injera.",
    ingredients: [
      "Chickpea Flour (Shiro)",
      "Garlic",
      "Onions",
      "Berbere",
      "Vegetable Oil",
      "Injera",
    ],
  },

  {
    id: "item-11",
    name: "Misir Wat",
    category: "ethiopian",
    spicy: true,
    price: 450,
    description:
      "Spicy red lentil stew simmered in authentic berbere spices.",
    ingredients: [
      "Red Lentils",
      "Berbere",
      "Onions",
      "Garlic",
      "Ginger",
      "Injera",
    ],
  },

  {
    id: "item-13",
    name: "Siga Kurt",
    category: "ethiopian",
    spicy: false,
    price: 550,
    description:
      "Freshly carved raw beef served with mitmita and warm awaze dip.",
    ingredients: [
      "Raw Beef Cuts",
      "Mitmita",
      "Awaze Dip",
      "Injera",
    ],
  },

  {
    id: "item-14",
    name: "Shekla Tibs",
    category: "ethiopian",
    spicy: false,
    price: 550,
    description:
      "Sizzling beef served in a traditional heated clay pot over live coals.",
    ingredients: [
      "Beef Cubes",
      "Niter Kibbeh",
      "Onions",
      "Green Peppers",
      "Rosemary",
      "Injera",
    ],
  },

  {
    id: "item-15",
    name: "Kitfo",
    category: "ethiopian",
    spicy: false,
    price: 450,
    description:
      "Minced tender beef seasoned with purified niter kibbeh and mitmita.",
    ingredients: [
      "Minced Beef",
      "Purified Niter Kibbeh",
      "Mitmita",
      "Koramima",
      "Ayib (Cheese)",
      "Gomen",
      "Injera",
    ],
  },

  {
    id: "item-16",
    name: "French Fries",
    category: "sides",
    spicy: false,
    price: 180,
    description:
      "Crispy golden fried potato chips seasoned light with sea salt.",
    ingredients: [
      "Potatoes",
      "Vegetable Oil",
      "Sea Salt",
    ],
  },

  {
    id: "item-17",
    name: "Garlic Bread",
    category: "sides",
    spicy: false,
    price: 150,
    description:
      "Toasted baguette slices brushed with garlic butter and parsley.",
    ingredients: [
      "Baguette Slices",
      "Garlic Butter",
      "Parsley",
    ],
  },

  {
    id: "item-18",
    name: "Fresh Orange Juice",
    category: "drinks",
    spicy: false,
    price: 120,
    description:
      "100% freshly squeezed natural orange juice.",
    ingredients: [
      "Freshly Squeezed Oranges",
    ],
  },

  {
    id: "item-19",
    name: "Coca-Cola",
    category: "drinks",
    spicy: false,
    price: 60,
    description:
      "Chilled 330ml glass bottle classic Coca-Cola.",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Caramel Color",
      "Phosphoric Acid",
      "Natural Flavors",
      "Caffeine",
    ],
  },

  {
    id: "item-20",
    name: "Sprite",
    category: "drinks",
    spicy: false,
    price: 60,
    description:
      "Chilled 330ml glass bottle crisp lemon-lime Sprite.",
    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Citric Acid",
      "Natural Lemon-Lime Flavors",
    ],
  },

  {
    id: "item-21",
    name: "Macchiato",
    category: "drinks",
    spicy: false,
    price: 80,
    description:
      "Rich layered espresso with steamed foam milk.",
    ingredients: [
      "Espresso",
      "Steamed Milk",
      "Milk Foam",
    ],
  },
];

export default dishes;