import PropTypes from "prop-types";

function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onSelect(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;
