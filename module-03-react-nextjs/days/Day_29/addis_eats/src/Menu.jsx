import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
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
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
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

  function handleAdd(dish) {
    setCart((currentCart) => {
      const existingDish = currentCart.find((item) => item.id === dish.id);
      if (existingDish) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...dish, quantity: 1 }];
    });
  }

  function handleQuantityChange(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <div className="page-layout">
          <div className="menu-content">
            <DishList dishes={visibleDishes} onAdd={handleAdd} />
          </div>
          <aside className="sidebar-wrapper">
            <div className="cart-sidebar">
              <div className="cart-title"><h2>Your Cart</h2></div>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty.</p>
                  <span>Add dishes to begin your order.</span>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div className="cart-item-info">
                          <h3>{item.name}</h3>
                          <p>{item.price} ETB each</p>
                        </div>
                        <div className="quantity-controls">
                          <button type="button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        </div>
                        <p className="item-total">{item.price * item.quantity} ETB</p>
                      </div>
                    ))}
                  </div>
                  <div className="cart-bottom">
                    <div className="cart-total"><span>Total</span><strong>{total} ETB</strong></div>
                    <button className="checkout-button" type="button" onClick={() => setIsCheckoutOpen(true)}>
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>
      {isCheckoutOpen && <OrderForm total={total} onClose={() => setIsCheckoutOpen(false)} />}
    </>
  );
}

export default Menu;
