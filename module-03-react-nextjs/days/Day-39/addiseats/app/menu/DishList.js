import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <div className="dish-image">
            <span>{dish.emoji}</span>
          </div>

          <div className="dish-info">
            <span className="dish-category">
              {dish.category}
            </span>

            <h2>{dish.name}</h2>

            <p>{dish.description}</p>

            <div className="dish-footer">
              <strong>{dish.price} ETB</strong>

              <Link
                href={`/menu/${dish.id}`}
                className="view-dish"
              >
                View Dish →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}