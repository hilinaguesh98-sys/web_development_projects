import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDishes } from '../api/dishes';
import { useCart } from '../cart/useCart';
import { getFavoriteIds, toggleFavorite } from '../favorites/favorites';

export default function Favorites() {
  const { addToCart } = useCart();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const syncFavorites = () => {
      const favoriteIds = getFavoriteIds();
      getDishes().then((items) => setDishes(items.filter((item) => favoriteIds.includes(item.id))));
    };

    syncFavorites();
    window.addEventListener('addisEatsFavoritesUpdated', syncFavorites);

    return () => window.removeEventListener('addisEatsFavoritesUpdated', syncFavorites);
  }, []);

  const removeFavorite = (id) => {
    toggleFavorite(id);
    setDishes((current) => current.filter((dish) => dish.id !== id));
  };

  return (
    <div className="container page-section simple-page">
      <h1>My Favorites</h1>
      <p className="page-intro">Your absolute favorite meals saved in one convenient place for easy reordering.</p>
      {dishes.length === 0 ? (
        <div className="empty-state"><h3>No favorites yet</h3><Link to="/menu" className="primary-button">Explore Menu</Link></div>
      ) : (
        <div className="special-grid favorites-grid">
          {dishes.map((dish) => (
            <article key={dish.id} className="special-card favorite-card">
              <div className="favorite-image-wrap">
                <img src={dish.image} alt={dish.name} />
                <button type="button" className="favorite-button active" onClick={() => removeFavorite(dish.id)} aria-label={`Remove ${dish.name} from favorites`}>♥</button>
              </div>
              <div className="special-card-body">
                <h3>{dish.name}</h3>
                <div className="special-meta"><strong>{dish.price} ETB</strong><button type="button" className="primary-button small-button" onClick={() => addToCart(dish)}>Add to Cart</button></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
