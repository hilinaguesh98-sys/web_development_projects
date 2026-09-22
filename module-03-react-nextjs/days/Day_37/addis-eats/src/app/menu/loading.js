export default function Loading() {
	return (
		<main className="container section" aria-busy="true">
			<div className="section-heading"><div><p className="eyebrow">Preparing the menu</p><h1>Fresh favorites are on the way.</h1></div></div>
			<div className="loading-grid" aria-label="Loading dishes"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div>
		</main>
	);
}
