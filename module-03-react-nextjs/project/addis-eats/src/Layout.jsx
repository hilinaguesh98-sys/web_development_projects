import { useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './auth/useauth';
import { useCart } from './cart/useCart';
import { useThemeStore } from './state/themeStore';

export default function Layout() {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="container nav-bar">
          <Link to="/" className="brand-wrap">
            <span className="brand-name">Addis<span>Eats</span></span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/cart">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              aria-pressed={theme === 'dark'}
            >
              <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
            <Link to="/admin/login" className="primary-button small-button">
              Admin
            </Link>
            {user ? (
              <div className="user-chip">
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span>{user.name}</span>
                <button type="button" className="text-button" onClick={signOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/checkout" className="primary-button small-button">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" className="page-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong className="footer-brand">Addis<span>Eats</span></strong>
            <p>Bringing the rich, authentic flavors of Ethiopia's finest kitchens straight to your doorstep.</p>
          </div>
          <div>
            <b>DISCOVER</b>
            <a href="/menu">Popular Places</a>
            <a href="/menu">Traditional Foods</a>
            <a href="/menu">New Listings</a>
            <a href="/menu">Special Offers</a>
          </div>
          <div>
            <b>GET HELP</b>
            <a href="/checkout">Contact Support</a>
            <a href="/checkout">Delivery Areas</a>
          </div>
        </div>
        
      </footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavLink to="/" end>⌂<small>Home</small></NavLink>
        <NavLink to="/menu">▥<small>Menu</small></NavLink>
        <NavLink to="/favorites">♡<small>Favorites</small></NavLink>
        <NavLink to="/cart">🛒<small>Cart</small></NavLink>
        <NavLink to="/orders">♙<small>Account</small></NavLink>
        <NavLink to="/admin/login">⚙<small>Admin</small></NavLink>
      </nav>
    </div>
  );
}
