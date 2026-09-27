import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food delivered to you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="header-container">
              <Link href="/" className="logo">
                Addis<span>Eats</span>
              </Link>

              <nav className="main-nav">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/checkout">Checkout</Link>
              </nav>

              <Link href="/cart" className="header-cart">
                🛒 Cart
              </Link>
            </div>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <div className="footer-container">
              <div>
                <Link href="/" className="footer-logo">
                  Addis Eats
                </Link>

                <p>
                  Authentic Ethiopian flavors, delivered with care.
                </p>
              </div>

              <div className="footer-links">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/checkout">Checkout</Link>
              </div>
            </div>

            <div className="footer-bottom">
              © 2026 Addis Eats. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}