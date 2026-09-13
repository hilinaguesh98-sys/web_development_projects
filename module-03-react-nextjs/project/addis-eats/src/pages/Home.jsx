import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDishes } from '../api/dishes';

const categories = ['All', 'Ethiopian', 'Pizza', 'Burger', 'Drinks', 'Desserts'];

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDishes()
      .then((data) => setDishes(data.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Hungry? We’ve got you covered.</h1>
            <p className="hero-text">
              Delicious Ethiopian and international dishes from your favorite local restaurants straight to your door.
            </p>
          </div>
          <form className="hero-search" onSubmit={(event) => { event.preventDefault(); window.location.href = '/menu'; }}>
            <span>⌕</span><input aria-label="Search restaurants and dishes" placeholder="Search for restaurants, dishes, or cuisines..." /><button type="submit">Find Food</button>
          </form>
        </div>
      </section>

      <section className="container section-block">
        <h3 className="craving-title">What are you craving?</h3>
        <div className="home-category-row">{categories.map((category) => <Link key={category} to={category === 'All' ? '/menu' : `/menu?category=${category.toLowerCase()}`} className={category === 'All' ? 'home-category active' : 'home-category'}>{category}</Link>)}</div>
        <div className="section-heading-row"><h2>Popular Right Now</h2><Link to="/menu" className="text-link">View All Menu →</Link></div>

        {loading ? (
          <p className="status-message">Loading specials...</p>
        ) : (
          <div className="special-grid">
            {dishes.map((dish) => (
              <article key={dish.id} className="special-card">
                <img src={dish.image} alt={dish.name} />
                <div className="special-card-body">
                  <h3>{dish.name}</h3>
                  <p>{dish.category}</p>
                  <div className="special-meta">
                    <span>{dish.price} ETB</span>
                    <Link to={`/menu/${dish.id}`} className="small-link">
                      View dish
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
