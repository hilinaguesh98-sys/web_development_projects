import { useState } from "react";
import Dish from "./Dish";
import Card from "./card";
import dishes from "./Data.js";
import "./App.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const uniqueCategories = [
    ...new Set(dishes.map((dish) => dish.category))
  ];
  const filteredDishes = selectedCategory === "all"
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <>
      <header className="header">
        <div className="header-text">
          <h1>Addis Eats</h1>
          <p>Welcome to Addis Eats</p>
        </div>
        <nav className="nav-link">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#order">Order</a>
        </nav>
      </header>
      <main className="menu">
        <h2>Our Menu</h2>
        <div className="category-bar" aria-label="Filter menu by category">
          <button
            className={selectedCategory === "all" ? "category-chip active" : "category-chip"}
            type="button"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {uniqueCategories.map((category) => (
            <button
              className={selectedCategory === category ? "category-chip active" : "category-chip"}
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {filteredDishes.length === 0 ? (
          <p className="empty-state">No dishes found in this category.</p>
        ) : (
          <div className="menu-grid">
            {filteredDishes.map((dish) => (
              <Card key={dish.id}>
                <Dish
                  name={dish.name}
                  price={dish.price}
                  spicy={dish.spicy}
                  category={dish.category}
                  description={dish.description}
                />
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Menu;

