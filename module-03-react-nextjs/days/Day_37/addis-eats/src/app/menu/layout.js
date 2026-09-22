import Link from "next/link";
import { getCategories } from "./data";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-shell container">
      <aside className="menu-sidebar" aria-label="Menu categories">
        <p className="eyebrow">Explore</p>
        <h2>Find your favorite.</h2>
        <p>Keep this menu guide close as you move from the catalogue into any dish.</p>
        <nav className="sidebar-links">
          {getCategories().map((category) => (
            <Link href={category === "All" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`} key={category}>
              {category}
            </Link>
          ))}
        </nav>
        <Link className="button button-small" href="/cart">View cart</Link>
      </aside>
      <div className="menu-content">{children}</div>
    </div>
  );
}