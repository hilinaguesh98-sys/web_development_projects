import Link from "next/link";

// Checkout reads request-specific searchParams, so it must render dynamically.
export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }) {
	const params = await searchParams;
	const step = params?.step || "details";

	return (
		<main className="container flow-card">
			<p className="eyebrow">Almost there / {step}</p><h1>Checkout</h1>
			<p>Confirm your delivery details and we will get your Addis Eats favorites moving. This route is ready for the checkout form in the next iteration.</p>
			<div className="flow-links"><Link className="button" href="/cart">Review cart</Link><Link className="text-link" href="/">Back home</Link></div>
		</main>
	);
}
