import Link from "next/link";

export default function CategoryBar({ categories, selectedCategory }) {
	return (
		<nav className="category-bar" aria-label="Menu categories">
			{categories.map((category) => (
				<Link
					className={selectedCategory === category ? "active" : ""}
					href={category === "All" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`}
					key={category}
				>
					{category}
				</Link>
			))}
		</nav>
	);
}
