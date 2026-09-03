import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";
import "./App.css";

const categories = ["all", "burgers", "pizza", "ethiopian", "sides", "drinks"];

function Header() {
  return (
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
  );
}

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadDishes(selectedCategory, { signal: controller.signal })
      .then((loadedDishes) => {
        setDishes(loadedDishes);
        setError("");
        setLoading(false);
      })
      .catch((requestError) => {
        if (requestError.name === "AbortError") return;
        setDishes([]);
        setError(requestError.message || "Unable to load the menu.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [selectedCategory]);

  const visibleDishes = dishes.filter((dish) => {
    const query = searchTerm.trim().toLowerCase();
    return !query || dish.name.toLowerCase().includes(query);
  });

  function handleCategorySelect(category) {
    if (category === selectedCategory) return;
    setLoading(true);
    setSelectedCategory(category);
  }

  if (loading) {
    return <div className="status-state"><p>Loading Addis Eats menu...</p></div>;
  }

  if (error) {
    return (
      <div className="status-state error">
        <p>Unable to load menu.</p>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="menu" id="home">
        <h2>Our Menu</h2>
        <div className="toolbar">
          <CategoryBar categories={categories} selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
          <input
            ref={searchInputRef}
            className="search-input"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search dishes"
            aria-label="Search dishes"
          />
        </div>
        <DishList dishes={visibleDishes} />
      </main>
    </>
  );
}

export default Menu;
