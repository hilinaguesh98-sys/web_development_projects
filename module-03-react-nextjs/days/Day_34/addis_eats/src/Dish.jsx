import PropTypes from "prop-types";

function Dish({
  name,
  price,
  spicy,
  currency = "ETB",
  description,
  category,
  onAdd,
}) {
  return (
    <article className="dish">
      <div className="dish-header">
        <h3>{name}</h3>

        {spicy === true && (
          <span className="spicy-badge">
            Spicy
          </span>
        )}
      </div>

      <p className="category">
        {category}
      </p>

      <p className="description">
        {description}
      </p>

      <p className="price">
        {currency} {price}
      </p>

      <button
        className="add-button"
        onClick={() => onAdd(price)}
      >
        Add
      </button>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;