import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = {
  kitfo: {
    name: "Kitfo",
    category: "Ethiopian",
    price: 300,
    emoji: "🥩",
    description:
      "Kitfo is one of Ethiopia's most loved traditional dishes. It is made from minced beef seasoned with Ethiopian butter and traditional spices.",
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
      "A refreshing combination of fresh fruit juices, perfect for a hot Addis Ababa afternoon.",
  },
};

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <nav className="navbar">
        <Link href="/" className="logo">
          Addis Eats
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </nav>

      <section className="dish-detail">
        <div className="detail-image">{dish.emoji}</div>

        <div className="detail-content">
          <span className="dish-category">{dish.category}</span>

          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <div className="detail-price">{dish.price} ETB</div>

          <div className="detail-actions">
            <Link href="/cart" className="primary-button">
              Add to Cart
            </Link>

            <Link href="/menu" className="secondary-button">
              Back to Menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}