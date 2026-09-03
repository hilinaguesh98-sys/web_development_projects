import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import dishes from "./Data.js";
import "./App.css";

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
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const categories = [
    "all",
    ...new Set(dishes.map((dish) => dish.category)),
  ];
  const filteredDishes = selectedCategory === "all"
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory);

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
    (currentTotal, item) => currentTotal + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <main className="menu" id="home">
        <h2>Our Menu</h2>
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <div className="page-layout">
          <div className="menu-content">
            <DishList dishes={filteredDishes} onAdd={handleAdd} />
          </div>
          <aside className="sidebar-wrapper">
            <div className="cart-sidebar">
              <div className="cart-title">
                <h2>Your Cart</h2>
              </div>
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
                    <div className="cart-total">
                      <span>Total</span>
                      <strong>{total} ETB</strong>
                    </div>
                    <button
                      className="checkout-button"
                      type="button"
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
      </main>
      {isCheckoutOpen && (
        <OrderForm total={total} onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}

export default Menu;
