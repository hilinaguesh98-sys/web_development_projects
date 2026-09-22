import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Addis Eats",
  description: "Discover Ethiopian favorites and order from Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header container">
          <Link className="brand" href="/">Addis<span>Eats</span></Link>
          <nav aria-label="Main navigation">
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link className="button button-small" href="/checkout">Checkout</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container footer-inner">
            <Link className="brand" href="/">Addis<span>Eats</span></Link>
            <p>Warm plates, bright flavors, and a little Addis in every order.</p>
            <Link className="text-link" href="/menu">Browse the menu</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
