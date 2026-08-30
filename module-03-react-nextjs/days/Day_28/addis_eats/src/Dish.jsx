import PropTypes from "prop-types";

function Dish({
  id,
  name,
  price,
  spicy,
  currency = "ETB",
  description,
  category,
  count = 0,
  onAdd,
  onRemove,
}) {
  return (
    <article className="dish">
      <div className="dish-header">
        <h3>{name}</h3>

        {spicy === true && (
          <span className="spicy-badge">Spicy</span>
        )}
      </div>

      <p className="category">{category}</p>

      <p className="description">{description}</p>

      <p className="price">
        {currency} {price}
      </p>

      {/* Count and buttons */}
      <div className="dish-actions">
        {count > 0 ? (
          <div className="dish-counter">
            <button
              className="btn-remove"
              onClick={() => onRemove(id)}
            >
              −
            </button>
            <span className="count">{count}</span>
            <button
              className="btn-add"
              onClick={() => onAdd(id)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn-add-to-cart"
            onClick={() => onAdd(id)}
          >
            Add
          </button>
        )}
      </div>
    </article>
  );
}

Dish.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  count: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

Dish.defaultProps = {
  currency: "ETB",
  count: 0,
};

export default Dish;

