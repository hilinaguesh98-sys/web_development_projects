export default function OrdersLoading() {
  return <div className="page-wrap container" aria-busy="true" aria-label="Loading your orders">
    <div className="page-title"><div className="skeleton skeleton-eyebrow"></div><div className="skeleton skeleton-title"></div><div className="skeleton skeleton-copy"></div></div>
    <div className="orders-loading-table">
      <div className="skeleton skeleton-toolbar"></div>
      {Array.from({ length: 6 }, (_, index) => <div className="skeleton skeleton-row" key={index}></div>)}
    </div>
  </div>
}