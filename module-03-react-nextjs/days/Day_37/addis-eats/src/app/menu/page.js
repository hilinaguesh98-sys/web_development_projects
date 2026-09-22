import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./catagory";
import DishList from "./Dishlist";
import { dishes, getCategories } from "./data";

export const revalidate = 60;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function DishResults({ selectedCategory }) {
	await wait(700);
	const visibleDishes = selectedCategory === "All"
		? dishes
		: dishes.filter((dish) => dish.category === selectedCategory);

	return <DishList dishes={visibleDishes} />;
}

export default function MenuPage() {
	const selectedCategory = "All";

	return (
		<main className="container section">
			<div className="section-heading">
				<div><p className="eyebrow">Made for the table</p><h1>Choose your comfort food.</h1></div>
				<Link className="text-link" href="/cart">Open cart</Link>
			</div>
			<CategoryBar categories={getCategories()} selectedCategory={selectedCategory} />
			<Suspense fallback={<div className="loading-grid" aria-label="Loading dishes"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div>}>
				<DishResults selectedCategory={selectedCategory} />
			</Suspense>
			<p className="state-note">Menu refreshes every 60 seconds.</p>
		</main>
	);
}
