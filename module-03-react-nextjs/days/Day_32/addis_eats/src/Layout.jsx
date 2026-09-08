import { Link, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";

function Layout() {
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
            Cart<CartBadge />
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">Addis Eats</footer>
    </>
  );
}

export default Layout;