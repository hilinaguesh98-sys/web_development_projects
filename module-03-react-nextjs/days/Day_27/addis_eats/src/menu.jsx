import Dish from "./Dish";
import Card from "./Card";
import dishes from "./Data.js";
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
  const uniqueCategories = [
    ...new Set(dishes.map((dish) => dish.category))
  ];
  return (
    <>
      <Header />
      <section className="menu">
        <h2>Our Menu</h2>
        {uniqueCategories.map((cat) => {
          const categoryDishes = dishes.filter(
            (dish) => dish.category === cat
          );
          return (
            <div key={cat} className="category-section">
              <h3 className="category-heading">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h3>
              <div className="menu-grid">
                {categoryDishes.map((dish) => (
                  <Card key={dish.id}>
                    <Dish
                      name={dish.name}
                      price={dish.price}
                      spicy={dish.spicy}
                      description={dish.description}
                      category={dish.category}
                    />
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Menu;

