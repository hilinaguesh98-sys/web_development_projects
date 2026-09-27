export default function Loading() {
  return (
    <main>
      <nav className="navbar">
        <div className="skeleton skeleton-logo"></div>

        <div className="skeleton-nav">
          <div className="skeleton skeleton-link"></div>
          <div className="skeleton skeleton-link"></div>
          <div className="skeleton skeleton-link"></div>
        </div>
      </nav>

      <section className="page-header">
        <div className="skeleton skeleton-small"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
      </section>

      <section className="menu-section">
        <div className="skeleton skeleton-category"></div>

        <div className="dish-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="skeleton-card" key={item}>
              <div className="skeleton skeleton-food"></div>

              <div className="skeleton-content">
                <div className="skeleton skeleton-line"></div>
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}