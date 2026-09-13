import { Link } from 'react-router-dom';

export default function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-image-link">
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </Link>

      <div className="dish-card-content">
        <Link to={`/menu/${dish.id}`} className="dish-name-link">
          <h3>{dish.name}</h3>
        </Link>

        <p className="dish-category">{dish.category}</p>
        <p className="dish-description">{dish.description}</p>

        <div className="dish-card-footer">
          <span className="dish-price">{dish.price} ETB</span>
          <button type="button" className="primary-button small-button" onClick={() => onAdd(dish)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
