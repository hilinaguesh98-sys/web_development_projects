import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { useCartStore } from "./cart/cartStore";
import { loadDishes } from "./api";
import useFetch from "./hooks/useFetch";

import "./App.css";

const categories = [
  "all",
  "burgers",
  "pizza",
  "ethiopian",
  "sides",
  "drinks",
];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const remove = useCartStore((state) => state.remove);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function handleCategoryChange(category) {
    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  }

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const fetchDishes = useCallback(
    ({ signal }) => loadDishes(selectedCategory, { signal }),
    [selectedCategory]
  );
  const { data: dishes, loading, error } = useFetch(fetchDishes);

  const filteredDishes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return dishes.filter((dish) => {
      if (!query) {
        return true;
      }

      return (
        dish.name.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query)
      );
    });
  }, [dishes, searchTerm]);

  function handleAdd(dish) {
    addItem(dish);
  }

  if (loading) {
    return (
      <div className="status-state loading">
        <p>Loading Addis Eats menu...</p>
      </div>
    );
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
      <div className="page-layout">
        <main className="menu" id="home">
          <h2>Our Menu</h2>

          <div className="toolbar">
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={handleCategoryChange}
            />

            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search dishes"
              aria-label="Search dishes"
            />
          </div>

          <DishList dishes={filteredDishes} onAddDish={handleAdd} />
        </main>

        <aside className="sidebar-wrapper">
          <div className="cart-sidebar">
            <div className="cart-title">
              <h2>Your Cart</h2>
            </div>

            {items.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <span>Add dishes to begin your order.</span>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.price} ETB each</p>
                      </div>

                      <div className="quantity-controls">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name}`}
                          onClick={() =>
                            remove(item.id)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={() =>
                            addItem(item)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        {item.price * item.quantity} ETB
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-bottom">
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{total} ETB</strong>
                  </div>

                  <Link to="/checkout" className="checkout-button">Checkout</Link>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

    </>
  );
}

export default Menu;