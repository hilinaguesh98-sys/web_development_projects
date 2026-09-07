import Dish from "./Dish";
import Card from "./card.jsx";
import { Link } from "react-router-dom";

function DishList({ dishes, onAddDish }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes available.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Link to={`/menu/${dish.id}`} className="dish-link">
            <Dish
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              description={dish.description}
              category={dish.category}
              onAdd={() => onAddDish(dish)}
            />
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default DishList;
