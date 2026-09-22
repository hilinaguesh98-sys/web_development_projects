import Link from "next/link";

export default function DishList({ dishes }) {
	return (
		<div className="dish-grid">
			{dishes.map((dish) => (
				<article className="dish-card" key={dish.id}>
					<div>
						<div className="dish-icon" aria-hidden="true">{dish.icon}</div>
						<h2>{dish.name}</h2>
						<p>{dish.description}</p>
					</div>
					<div className="dish-meta">
						<strong>{dish.price} ETB</strong>
						<Link className="text-link" href={`/menu/${dish.id}`}>View dish</Link>
					</div>
				</article>
			))}
		</div>
	);
}
