import Link from "next/link";

export default function CartPage() {
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

      <section className="simple-page">
        <span className="section-label">YOUR ORDER</span>

        <h1>Your Cart</h1>

        <div className="cart-card">
          <div className="cart-item">
            <div className="cart-food">🥩</div>

            <div>
              <h3>Kitfo</h3>
              <p>1 × 300 ETB</p>
            </div>

            <strong>300 ETB</strong>
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>300 ETB</strong>
          </div>

          <Link href="/checkout" className="primary-button full-button">
            Proceed to Checkout
          </Link>
        </div>

        <Link href="/menu" className="back-link">
          ← Continue Shopping
        </Link>
      </section>
    </main>
  );
}