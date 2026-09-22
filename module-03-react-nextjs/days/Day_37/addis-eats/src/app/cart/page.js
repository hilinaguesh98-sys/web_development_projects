import Link from "next/link";

export default function CartPage() {
	return (
		<main className="container flow-card">
			<p className="eyebrow">Your order</p><h1>Cart</h1>
			<p>Your cart is ready for the dishes you want to share. Add something from the menu to begin building your order.</p>
			<div className="flow-links"><Link className="button" href="/menu">Add dishes</Link><Link className="text-link" href="/checkout">Go to checkout</Link></div>
		</main>
	);
}
