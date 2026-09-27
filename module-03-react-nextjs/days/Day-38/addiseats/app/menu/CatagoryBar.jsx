"use client";

const categories = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burger",
  "Drinks",
  "Sides",
];

export default function CategoryBar({
  category,
  setCategory,
}) {
  return (
    <div className="category-bar">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={
            category === item
              ? "category-button active"
              : "category-button"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
}