import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDishes } from '../api/dishes';
import { useCart } from '../cart/useCart';
import { isFavorite, toggleFavorite } from '../favorites/favorites';

export default function DishDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    getDishes()
      .then((data) => {
        const foundDish = data.find((item) => item.id === id);
        setDish(foundDish || null);
        setFavorite(isFavorite(id));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavoriteToggle = () => {
    setFavorite(toggleFavorite(id));
  };

  if (loading) {
    return (
      <div className="container page-section center-content">
        <div className="loading-spinner" aria-label="Loading dish" />
        <p>Loading dish...</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="container page-section center-content">
        <div className="empty-state">
          <h3>Dish not found</h3>
          <p>The item you are looking for does not exist.</p>
          <Link to="/menu" className="primary-button">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-section">
      <div className="dish-detail-card">
        <div className="favorite-image-wrap">
          <img src={dish.image} alt={dish.name} className="dish-detail-image" />
          <button
            type="button"
            className={favorite ? 'favorite-button active' : 'favorite-button'}
            onClick={handleFavoriteToggle}
            aria-label={favorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
          >
            {favorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="dish-detail-info">
          <p className="eyebrow">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="dish-detail-description">{dish.description}</p>
          <div className="dish-detail-price">{dish.price} ETB</div>

          <div className="detail-actions">
            <button type="button" className="primary-button" onClick={() => addToCart(dish)}>
              Add to Cart
            </button>
            <button type="button" className={favorite ? 'secondary-button favorite-toggle active' : 'secondary-button favorite-toggle'} onClick={handleFavoriteToggle}>
              {favorite ? 'Remove Favorite' : 'Add Favorite'}
            </button>
            <Link to="/menu" className="secondary-button">
              Back to Menu
            </Link>
            <Link to="/cart" className="secondary-button">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
