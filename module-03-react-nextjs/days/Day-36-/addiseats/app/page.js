import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <Link href="/" className="logo">
          Addis Eats
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">AUTHENTIC ETHIOPIAN FLAVORS</span>

          <h1>
            Taste the heart
            <br />
            of <span>Addis Ababa</span>
          </h1>

          <p>
            Discover delicious Ethiopian dishes prepared with traditional
            flavors and delivered right to your door.
          </p>

          <Link href="/menu" className="primary-button">
            Explore Menu
          </Link>
        </div>

        <div className="hero-food">
          <div className="food-circle">🍛</div>
        </div>
      </section>

      <section className="home-section">
        <p className="section-label">WHY ADDIS EATS?</p>
        <h2>Good food. Simple ordering.</h2>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">🍽️</div>
            <h3>Authentic Food</h3>
            <p>Enjoy traditional Ethiopian dishes and modern favorites.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Get your favorite meals delivered quickly and conveniently.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">❤️</div>
            <h3>Made With Care</h3>
            <p>Quality ingredients and delicious recipes in every meal.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
