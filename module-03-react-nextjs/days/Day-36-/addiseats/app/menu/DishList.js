import Link from "next/link";

const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Ethiopian",
    price: 300,
    emoji: "🥩",
    description: "Minced beef seasoned with Ethiopian butter and spices.",
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Ethiopian",
    price: 350,
    emoji: "🍗",
    description: "Traditional spicy chicken stew served with injera.",
  },
  {
    id: "pizza",
    name: "Addis Special Pizza",
    category: "Pizza",
    price: 450,
    emoji: "🍕",
    description: "A delicious pizza with fresh toppings and Ethiopian flavor.",
  },
  {
    id: "burger",
    name: "Addis Burger",
    category: "Burger",
    price: 280,
    emoji: "🍔",
    description: "Juicy beef burger with fresh vegetables and special sauce.",
  },
  {
    id: "shiro",
    name: "Shiro",
    category: "Ethiopian",
    price: 220,
    emoji: "🥣",
    description: "Smooth chickpea stew prepared with traditional spices.",
  },
  {
    id: "spris",
    name: "Spris",
    category: "Drinks",
    price: 120,
    emoji: "🥤",
    description: "A refreshing mix of fresh Ethiopian fruit juices.",
  },
];

export default function DishList() {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <div className="dish-image">{dish.emoji}</div>

          <div className="dish-content">
            <span className="dish-category">{dish.category}</span>

            <h3>{dish.name}</h3>

            <p>{dish.description}</p>

            <div className="dish-bottom">
              <strong>{dish.price} ETB</strong>

              <Link href={`/menu/${dish.id}`} className="view-button">
                View Dish
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}