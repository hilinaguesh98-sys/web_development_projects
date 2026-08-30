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

export default CategoryBar;
