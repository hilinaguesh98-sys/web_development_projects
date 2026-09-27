import { Suspense } from "react";
import DishList from "./DishList";
import FilterShell from "./FilterShell";

async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
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
        "A refreshing combination of fresh Ethiopian fruit juices.",
    },
  ];
}

function MenuLoading() {
  return (
    <div className="dish-grid">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div className="dish-skeleton-card" key={item}>
          <div className="skeleton skeleton-image"></div>

          <div className="skeleton-content">
            <div className="skeleton skeleton-small"></div>
            <div className="skeleton skeleton-heading"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <section className="menu-page">
      <div className="menu-heading">
        <div>
          <span className="eyebrow">DISCOVER OUR MENU</span>

          <h1>Good food starts here.</h1>

          <p>
            Explore authentic Ethiopian dishes and Addis Eats favorites.
          </p>
        </div>

        <div className="menu-count">
          <strong>{dishes.length}</strong>
          <span>Dishes</span>
        </div>
      </div>

      <Suspense fallback={<MenuLoading />}>
        <FilterShell>
          <DishList dishes={dishes} />
        </FilterShell>
      </Suspense>
    </section>
  );
}