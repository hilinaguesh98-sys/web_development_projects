import Link from "next/link";
import CategoryBar from "./CatagoryBar";
import DishList from "./DishList";

export default function MenuPage() {
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

      <section className="page-header">
        <span className="section-label">OUR MENU</span>
        <h1>Choose your favorite dish</h1>
        <p>
          Explore our selection of Ethiopian favorites and delicious modern
          meals.
        </p>
      </section>

      <section className="menu-section">
        <CategoryBar />
        <DishList />
      </section>
    </main>
  );
}