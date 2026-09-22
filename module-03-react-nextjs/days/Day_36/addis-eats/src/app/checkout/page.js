import Link from "next/link";

export default function CheckoutPage() {
	return (
		<main className="container flow-card">
			<p className="eyebrow">Almost there</p><h1>Checkout</h1>
			<p>Confirm your delivery details and we will get your Addis Eats favorites moving. This route is ready for the checkout form in the next iteration.</p>
			<div className="flow-links"><Link className="button" href="/cart">Review cart</Link><Link className="text-link" href="/">Back home</Link></div>
		</main>
	);
}
