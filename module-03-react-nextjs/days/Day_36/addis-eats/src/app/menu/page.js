import Link from "next/link";
import CategoryBar from "./catagory";
import DishList from "./Dishlist";
import { dishes, getCategories } from "./data";

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export default async function MenuPage({ searchParams }) {
	const params = await searchParams;

	if (params?.error === "1") {
		throw new Error("The menu preview was intentionally interrupted.");
	}

	await wait(700);
	const selectedCategory = params?.category || "All";
	const visibleDishes = selectedCategory === "All"
		? dishes
		: dishes.filter((dish) => dish.category === selectedCategory);

	return (
		<main className="container section">
			<div className="section-heading">
				<div><p className="eyebrow">Made for the table</p><h1>Choose your comfort food.</h1></div>
				<Link className="text-link" href="/cart">Open cart</Link>
			</div>
			<CategoryBar categories={getCategories()} selectedCategory={selectedCategory} />
			<DishList dishes={visibleDishes} />
			<p className="state-note"><Link href="/menu?error=1">Preview the menu error state</Link></p>
		</main>
	);
}
