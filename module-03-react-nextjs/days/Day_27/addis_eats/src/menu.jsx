import dishes from "./Data.js";
import "./App.css"
import Dish from "./Dish";
function Header(){
  return(
    <div className="header">
      <div className="header-text">
      <h1>Addis Eats</h1>
      <p>welcome to addis eats </p></div>
      <nav className="nav-link">
        <a href="#home">home</a>
        <a href="#about">about</a>
        <a href="#order">order</a>
      </nav>
    </div>
  )
}
function Menu({ category }) {
  const filteredMenu = dishes.filter(
    (dish) => !category || category === "all" || dish.category === category
  );

  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <>
      <Header />
      <div className="menu">
        {filteredMenu.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;