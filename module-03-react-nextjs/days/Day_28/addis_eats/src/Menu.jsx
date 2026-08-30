import { useState, useEffect, useRef } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { loadDishes } from "./api.js";
import "./App.css";

function Header() {
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
      </nav>
    </div>
  );
}

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderItems, setOrderItems] = useState({});
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Fetch dishes when component mounts or category changes
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadDishes(selectedCategory);
        setDishes(data);
      } catch (err) {
        setError(err.message || "Failed to load dishes. Please try again.");
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();

    // Cleanup function: abort the request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, [selectedCategory]);

  // Auto-focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const uniqueCategories = [
    ...new Set(dishes.map((dish) => dish.category))
  ];

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddDish = (dishId) => {
    setOrderItems((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleRemoveDish = (dishId) => {
    setOrderItems((prev) => {
      const newItems = { ...prev };
      if (newItems[dishId] > 1) {
        newItems[dishId]--;
      } else {
        delete newItems[dishId];
      }
      return newItems;
    });
  };

  const orderTotal = Object.keys(orderItems).reduce((total, dishId) => {
    const dish = dishes.find((d) => d.id === dishId);
    return total + (dish ? dish.price * orderItems[dishId] : 0);
  }, 0);

  // Render loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <p className="loading">Loading menu... 🍽️</p>
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Header />
        <div className="error-container">
          <p className="error">❌ {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="main-container">
        <section className="menu-section">
          <h2>Our Menu</h2>
          
          {/* Search Input */}
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <CategoryBar
            categories={["all", ...uniqueCategories]}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {filteredDishes.length === 0 ? (
            <div className="empty-state">
              <p>No dishes found matching your search.</p>
            </div>
          ) : (
            <DishList
              dishes={filteredDishes}
              orderItems={orderItems}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
            />
          )}
        </section>

        <aside className="order-section">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {Object.keys(orderItems).map((dishId) => {
                const dish = dishes.find((d) => d.id === dishId);
                return (
                  <div key={dishId} className="order-item">
                    <span>
                      {dish.name} x{orderItems[dishId]}
                    </span>
                    <span className="item-price">
                      ETB {dish.price * orderItems[dishId]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="order-total">
              <strong>Total: ETB {orderTotal}</strong>
            </div>
          </div>

          {orderTotal > 0 && (
            <OrderForm orderTotal={orderTotal} orderItems={orderItems} />
          )}
        </aside>
      </div>
    </>
  );
}

export default Menu;



