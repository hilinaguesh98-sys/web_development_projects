import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDishes } from '../api/dishes';
import DishCard from './dishcard';
import { useCart } from '../cart/useCart';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    getDishes()
      .then((data) => {
        setDishes(data);
        setError('');
      })
      .catch(() => setError('We could not load the menu right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(dishes.map((dish) => dish.category))],
    [dishes],
  );

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, searchTerm, selectedCategory]);

  const changeCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams);

    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }

    setSearchParams(nextParams);
  };

  if (loading) {
    return (
      <div className="container page-section center-content">
        <div className="loading-spinner" aria-label="Loading menu" />
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-section center-content">
        <p className="error-message-block">{error}</p>
      </div>
    );
  }

  return (
    <div className="container page-section">
      <div className="menu-topbar">
        <div>
          <p className="eyebrow">Our menu</p>
          <h1>Fresh favorites for every craving</h1>
        </div>

        <div className="search-wrap">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for food, cuisines..."
            aria-label="Search dishes"
          />
        </div>
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'filter-chip active' : 'filter-chip'}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
