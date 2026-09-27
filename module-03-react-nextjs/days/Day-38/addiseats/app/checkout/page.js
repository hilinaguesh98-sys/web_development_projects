import Link from "next/link";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="home-content">
        <span className="eyebrow">
          AUTHENTIC ETHIOPIAN FLAVORS
        </span>

        <h1>
          Taste the heart of
          <span> Addis Ababa.</span>
        </h1>

<p>
          Discover delicious Ethiopian dishes prepared with
          traditional flavors and delivered right to your door.
        </p>

        <Link href="/menu" className="primary-button">
          Explore Menu
        </Link>
      </div>

      <div className="home-food">
        🍛
      </div>
    </section>
  );
}