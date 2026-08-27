import Dish from "./Dish";
import menu from "./Data"

function Menu({ category }) {
  const filteredMenu = menu.filter(
    (dish) => dish.category === category
  );

  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
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
  );
}

export default Menu;