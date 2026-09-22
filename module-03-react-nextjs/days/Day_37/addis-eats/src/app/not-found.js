import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container state">
      <p className="eyebrow">404 / Dish not found</p>
      <h1>That plate is not on our menu.</h1>
      <p>The dish link may be out of date, but there are plenty of other favorites waiting.</p>
      <Link className="button" href="/menu">Browse the menu</Link>
    </main>
  );
}