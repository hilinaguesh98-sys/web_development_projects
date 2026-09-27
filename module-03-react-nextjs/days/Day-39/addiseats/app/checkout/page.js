import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <section className="simple-page">
      <span className="eyebrow">
        CHECKOUT
      </span>

      <h1>Complete your order</h1>

      <p className="page-description">
        Enter your delivery information and place your order.
      </p>

      <CheckoutForm />

      <Link href="/cart" className="back-link">
        ← Back to Cart
      </Link>
    </section>
  );
}