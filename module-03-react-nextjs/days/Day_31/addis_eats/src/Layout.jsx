import { Link, Outlet } from "react-router-dom";
import { useCart } from "./cart/useCart";

function Layout() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="header">
        <div className="header-text">
          <h1>Addis Eats</h1>
          <p>Welcome to Addis Eats</p>
        </div>
        <nav className="nav-link">
          <Link to="/">Home</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/" className="cart-header-button">
            Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">Addis Eats</footer>
    </>
  );
}

export default Layout;