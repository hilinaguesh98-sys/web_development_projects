export default function Loading() {
  return (
    <section className="menu-page">
      <div className="menu-heading">
        <div>
          <div className="skeleton skeleton-eyebrow"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-description"></div>
        </div>
      </div>

      <div className="category-bar">
        <div className="skeleton skeleton-category-button"></div>
        <div className="skeleton skeleton-category-button"></div>
        <div className="skeleton skeleton-category-button"></div>
        <div className="skeleton skeleton-category-button"></div>
      </div>

      <div className="dish-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="dish-skeleton-card" key={item}>
            <div className="skeleton skeleton-image"></div>

            <div className="skeleton-content">
              <div className="skeleton skeleton-small"></div>
              <div className="skeleton skeleton-heading"></div>
              <div className="skeleton skeleton-line"></div>
              <div className="skeleton skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}