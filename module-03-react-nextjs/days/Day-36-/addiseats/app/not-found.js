import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-number">404</div>

      <h1>Dish not found</h1>

      <p>
        Sorry, we couldn't find the dish you're looking for.
      </p>

      <Link href="/menu" className="primary-button">
        Browse Menu
      </Link>
    </main>
  );
}