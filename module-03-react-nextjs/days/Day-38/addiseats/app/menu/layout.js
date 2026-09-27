import Link from "next/link";

const categories = [
  {
    name: "All Dishes",
    href: "/menu",
    icon: "🍽️",
  },
  {
    name: "Ethiopian",
    href: "/menu?category=ethiopian",
    icon: "🇪🇹",
  },
  {
    name: "Pizza",
    href: "/menu?category=pizza",
    icon: "🍕",
  },
  {
    name: "Burger",
    href: "/menu?category=burger",
    icon: "🍔",
  },
  {
    name: "Drinks",
    href: "/menu?category=drinks",
    icon: "🥤",
  },
  {
    name: "Sides",
    href: "/menu?category=sides",
    icon: "🍟",
  },
];

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-label">MENU</span>
          <h2>Categories</h2>
        </div>

        <nav className="category-sidebar">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.name}
              className="sidebar-link"
            >
              <span>{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-promo">
          <div className="promo-icon">🍛</div>

          <h3>Hungry?</h3>

          <p>
            Discover your next favorite Ethiopian dish.
          </p>

          <Link href="/menu" className="promo-button">
            View Menu
          </Link>
        </div>
      </aside>

      <section className="menu-content">
        {children}
      </section>
    </div>
  );
}