import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../favorites/favorites';

export default function DishCard({ dish, onAdd }) {
  const [favorite, setFavorite] = useState(isFavorite(dish.id));

  useEffect(() => {
    const syncFavorite = () => setFavorite(isFavorite(dish.id));
    syncFavorite();
    window.addEventListener('addisEatsFavoritesUpdated', syncFavorite);

    return () => window.removeEventListener('addisEatsFavoritesUpdated', syncFavorite);
  }, [dish.id]);

  const handleFavoriteToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorite(toggleFavorite(dish.id));
  };

  return (
    <article className="dish-card">
      <div className="favorite-image-wrap">
        <Link to={`/menu/${dish.id}`} className="dish-image-link">
          <img src={dish.image} alt={dish.name} className="dish-image" />
        </Link>
        <button
          type="button"
          className={favorite ? 'favorite-button active' : 'favorite-button'}
          onClick={handleFavoriteToggle}
          aria-label={favorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>

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
