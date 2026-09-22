import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="site-header container">
        <Link className="brand" href="/">Addis<span>Eats</span></Link>
        <nav aria-label="Main navigation">
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link className="button button-small" href="/checkout">Checkout</Link>
        </nav>
      </header>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Taste Addis, wherever you are</p>
          <h1>Comfort food with a distinctly Ethiopian heart.</h1>
          <p>Find generous plates, bright flavors, and familiar favorites prepared for your next meal.</p>
          <div className="actions"><Link className="button" href="/menu">Explore the menu</Link><Link className="text-link" href="/cart">View your cart</Link></div>
        </div>
        <div className="hero-art" aria-label="Illustration of an Ethiopian meal" role="img">🍲</div>
      </section>
      <section className="container feature-strip" aria-label="Addis Eats highlights">
        <article><span>01</span><h2>Local favorites</h2><p>Doro wat, tibs, shiro, and more.</p></article>
        <article><span>02</span><h2>Simple ordering</h2><p>Choose a dish, add it to your cart, and check out.</p></article>
        <article><span>03</span><h2>Made for sharing</h2><p>Bring a little warmth to the table.</p></article>
      </section>
    </main>
  );
}
