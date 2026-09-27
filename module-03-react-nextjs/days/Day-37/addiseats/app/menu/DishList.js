import Link from "next/link";

const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Ethiopian",
    price: 300,
    emoji: "🥩",
    description:
      "Minced beef seasoned with Ethiopian butter and traditional spices.",
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Ethiopian",
    price: 350,
    emoji: "🍗",
    description:
      "Traditional spicy chicken stew served with injera.",
  },
  {
    id: "pizza",
    name: "Addis Special Pizza",
    category: "Pizza",
    price: 450,
    emoji: "🍕",
    description:
      "Classic pizza combined with a delicious Addis Eats twist.",
  },
  {
    id: "burger",
    name: "Addis Burger",
    category: "Burger",
    price: 280,
    emoji: "🍔",
    description:
      "Juicy beef burger with fresh vegetables and special sauce.",
  },
  {
    id: "shiro",
    name: "Shiro",
    category: "Ethiopian",
    price: 220,
    emoji: "🥣",
    description:
      "Smooth chickpea stew prepared with traditional Ethiopian spices.",
  },
  {
    id: "spris",
    name: "Spris",
    category: "Drinks",
    price: 120,
    emoji: "🥤",
    description:
      "A refreshing mix of fresh Ethiopian fruit juices.",
  },
];

export default async function DishList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <div className="dish-image">
            <span>{dish.emoji}</span>
          </div>

          <div className="dish-info">
            <span className="dish-category">
              {dish.category}
            </span>

            <h2>{dish.name}</h2>

            <p>{dish.description}</p>

            <div className="dish-footer">
              <strong>{dish.price} ETB</strong>

              <Link
                href={`/menu/${dish.id}`}
                className="view-dish"
              >
                View Dish →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}