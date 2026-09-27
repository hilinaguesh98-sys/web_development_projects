import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = {
  kitfo: {
    name: "Kitfo",
    category: "Ethiopian",
    price: 300,
    emoji: "🥩",
    description:
      "Kitfo is one of Ethiopia's most famous traditional dishes. It is made from minced beef seasoned with Ethiopian butter and traditional spices.",
  },

  "doro-wot": {
    name: "Doro Wot",
    category: "Ethiopian",
    price: 350,
    emoji: "🍗",
    description:
      "Doro Wot is a traditional Ethiopian chicken stew prepared with berbere, onions and spices and served with injera.",
  },

  pizza: {
    name: "Addis Special Pizza",
    category: "Pizza",
    price: 450,
    emoji: "🍕",
    description:
      "A delicious pizza combining classic pizza ingredients with a special Addis Eats twist.",
  },

  burger: {
    name: "Addis Burger",
    category: "Burger",
    price: 280,
    emoji: "🍔",
    description:
      "A juicy beef burger prepared with fresh vegetables and our special Addis Eats sauce.",
  },

  shiro: {
    name: "Shiro",
    category: "Ethiopian",
    price: 220,
    emoji: "🥣",
    description:
      "A smooth and flavorful chickpea stew prepared with traditional Ethiopian spices.",
  },

  spris: {
    name: "Spris",
    category: "Drinks",
    price: 120,
    emoji: "🥤",
    description:
      "A refreshing combination of fresh fruit juices.",
  },
};

export function generateStaticParams() {
  return Object.keys(dishes).map((id) => ({
    id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <section className="dish-detail-page">
      <Link href="/menu" className="back-to-menu">
        ← Back to Menu
      </Link>

      <div className="dish-detail-card">
        <div className="detail-food">
          <span>{dish.emoji}</span>
        </div>

        <div className="detail-information">
          <span className="dish-category">
            {dish.category}
          </span>

          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <div className="detail-price">
            {dish.price} ETB
          </div>

          <div className="detail-buttons">
            <Link href="/cart" className="primary-button">
              Add to Cart
            </Link>

            <Link
              href="/checkout"
              className="secondary-button"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}