import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDishes } from '../api/dishes';

export default function Dashboard() {
  const [dishes, setDishes] = useState([]);
  const [orders] = useState(() => JSON.parse(localStorage.getItem('addisEatsOrders') || '[]'));
  useEffect(() => { getDishes().then(setDishes); }, []);
  const topDishes = useMemo(() => {
    const counts = orders.flatMap((order) => order.items || []).reduce((result, item) => ({ ...result, [item.name]: (result[item.name] || 0) + item.quantity }), {});
    return dishes.map((dish) => ({ ...dish, count: counts[dish.name] || 0 })).sort((first, second) => second.count - first.count).slice(0, 5);
  }, [dishes, orders]);
  const statuses = orders.reduce((result, order) => { const status = order.status || 'Pending'; return { ...result, [status]: (result[status] || 0) + 1 }; }, {});

  return (
    <section className="admin-section">
      <div className="admin-heading"><div><p className="eyebrow"></p><h2>Dashboard</h2></div><Link className="secondary-button" to="/admin/orders">View orders</Link></div>
      <div className="admin-stats"><article><strong>{orders.length}</strong><span>Total orders</span></article><article><strong>{dishes.length}</strong><span>Menu dishes</span></article></div>
      <div className="admin-dashboard-grid"><article className="admin-panel"><h3>Top dishes</h3>
      {topDishes.map((dish) => <div className="admin-bar-row" 
      key={dish.id}><span>{dish.name}</span>
      <b style={{ '--bar-width': `${
        Math.min(100, dish.count * 20)}%` }}>
          {dish.count}</b></div>)}
          </article>
          <article className="admin-panel">
            <h3>Order status</h3>
            {Object.entries(statuses).length === 0 ? 
            <p className="subtle-text">No orders yet.</p> : Object.entries(statuses).map(([status, count]) => 
            <div className="status-row" key={status}>
              <span>{status}</span><strong>{count}
                </strong></div>)}</article></div>
    </section>
  );
}