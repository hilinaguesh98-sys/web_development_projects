import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./card.jsx";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DishList;
