import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish } from "../data";

export default async function DishPage({ params }) {
	const { id } = await params;
	const dish = getDish(id);

	if (!dish) notFound();

	return (
		<main className="container detail">
			<div className="detail-icon" aria-hidden="true">{dish.icon}</div>
			<div>
				<p className="eyebrow">{dish.category}</p>
				<h1>{dish.name}</h1>
				<p>{dish.description}</p>
				<h2>Ingredients</h2>
				<ul className="ingredients">{dish.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
				<p><strong>{dish.price} ETB</strong></p>
				<div className="flow-links"><Link className="button" href="/cart">Add to cart</Link><Link className="text-link" href="/menu">Back to menu</Link></div>
			</div>
		</main>
	);
}
