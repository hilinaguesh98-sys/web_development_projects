import { Suspense } from "react";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

export const revalidate = 60;

function DishListLoading() {
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

export default function MenuPage() {
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
          <strong>06</strong>
          <span>Dishes</span>
        </div>
      </div>

      <CategoryBar />

      <Suspense fallback={<DishListLoading />}>
        <DishList />
      </Suspense>
    </section>
  );
}