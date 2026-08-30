import Dish from "./Dish";
import Card from "./card.jsx";

function DishList({ dishes, orderItems, onAddDish, onRemoveDish }) {
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
          <Dish
            id={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            description={dish.description}
            category={dish.category}
            count={orderItems[dish.id] || 0}
            onAdd={onAddDish}
            onRemove={onRemoveDish}
          />
        </Card>
      ))}
    </div>
  );
}

export default DishList;
