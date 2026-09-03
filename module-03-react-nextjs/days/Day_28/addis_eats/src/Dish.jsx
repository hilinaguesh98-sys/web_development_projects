import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB", category, description, onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((currentCount) => currentCount + 1);
    onAdd({ name, price });
  }

  return (
    <article className="dish">
      <div className="dish-header">
        <h3>{name}</h3>
        {spicy === true && <span className="spicy-badge">Spicy</span>}
      </div>
      <p className="category">{category}</p>
      <p className="description">{description}</p>
      <p className="price">{currency} {price}</p>
      <button className="add-button" type="button" onClick={handleAdd}>
        Add {count > 0 && `(${count})`}
      </button>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;
