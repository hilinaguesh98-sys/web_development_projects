import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadDishes } from "./api";
import { useCart } from "./cart/useCart";

function DishDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    let active = true;
    loadDishes().then((dishes) => {
      if (active) setDish(dishes.find((item) => item.id === id));
    });
    return () => { active = false; };
  }, [id]);

  if (dish === undefined) {
    return <main className="status-state"><p>Dish not found.</p><Link to="/">Back to menu</Link></main>;
  }

  if (!dish) return <main className="status-state"><p>Loading dish...</p></main>;

  return (
    <main className="dish-detail">
      <Link to="/">Back to menu</Link>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p className="price">ETB {dish.price}</p>
      <button type="button" className="add-button" onClick={() => dispatch({ type: "ADD_ITEM", item: dish })}>Add to cart</button>
    </main>
  );
}

export default DishDetail;