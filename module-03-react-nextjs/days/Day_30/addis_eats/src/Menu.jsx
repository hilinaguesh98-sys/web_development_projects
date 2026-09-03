import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { useCart } from "./cart/useCart";
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

function Header() {
  const { items } = useCart();
  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="header">
      <div className="header-text">
        <h1>Addis Eats</h1>
        <p>Welcome to Addis Eats</p>
      </div>

      <nav className="nav-link">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#order">Order</a>
        <button type="button" className="cart-header-button">
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </nav>
    </div>
  );
}

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { items, dispatch, total } = useCart();

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
    dispatch({ type: "ADD_ITEM", item: dish });
  }

  function handleCloseCheckout() {
    setIsCheckoutOpen(false);
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
      <Header />

      <div className="page-layout">
        <main className="menu" id="home">
          <h2>Our Menu</h2>

          <div className="toolbar">
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
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
                            dispatch({ type: "REMOVE_ITEM", id: item.id })
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={() =>
                            dispatch({
                              type: "ADD_ITEM",
                              item,
                            })
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

                  <button
                    type="button"
                    className="checkout-button"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {isCheckoutOpen && <OrderForm onClose={handleCloseCheckout} />}
    </>
  );
}

export default Menu;