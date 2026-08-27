import PropTypes from "prop-types";
import Card from "./card";
function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <Card>
      <h2>{name}</h2>
      <p>
        {price} {currency}
      </p>

      {typeof spicy === "boolean" && spicy && (
        <span className="spicy-badge">Spicy</span>
      )}
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;