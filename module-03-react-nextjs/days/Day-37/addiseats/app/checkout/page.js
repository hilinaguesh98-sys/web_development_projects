import Link from "next/link";

export default function CheckoutPage() {
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
        <span className="section-label">CHECKOUT</span>

        <h1>Complete your order</h1>

        <div className="checkout-card">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Phone Number</label>
          <input type="tel" placeholder="09XXXXXXXX" />

          <label>Delivery Address</label>
          <textarea placeholder="Enter your delivery address"></textarea>

          <div className="checkout-summary">
            <span>Order Total</span>
            <strong>300 ETB</strong>
          </div>

          <button className="primary-button full-button">
            Place Order
          </button>

          <Link href="/cart" className="back-link">
            ← Back to Cart
          </Link>
        </div>
      </section>
    </main>
  );
}