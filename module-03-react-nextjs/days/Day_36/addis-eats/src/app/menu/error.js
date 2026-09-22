"use client";

import Link from "next/link";

export default function MenuError({ reset }) {
	return (
		<main className="container state">
			<p className="eyebrow">Menu unavailable</p>
			<h1>We could not serve the menu.</h1>
			<p>Try the request again or return home while the kitchen catches up.</p>
			<div className="flow-links"><button className="button" type="button" onClick={() => reset()}>Try again</button><Link className="text-link" href="/">Return home</Link></div>
		</main>
	);
}
