import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders] = useState(() => JSON.parse(localStorage.getItem('addisEatsOrders') || '[]').reverse());

  return (
    <div className="container page-section simple-page orders-page">
      <div className="page-heading-row"><div><h1>My Orders</h1><p className="page-intro">Review and track your current orders or reorder past favorites.</p></div><div className="segmented-control"><button type="button" className="active">Active Orders</button><button type="button">Past Orders</button></div></div>
      {orders.length === 0 ? (
        <div className="empty-state"><h3>No orders yet</h3><Link to="/menu" className="primary-button">Start Ordering</Link></div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-top"><strong>Order #{String(order.id).slice(-4)}</strong><span>Placed on: {new Date(order.createdAt).toLocaleDateString()}</span><b className="status-pill">Preparing</b></div>
              <div className="order-card-main"><div className="order-thumbnails">{order.items.slice(0, 3).map((item) => <img key={item.id} src={item.image} alt="" />)}<strong>{order.items[0]?.name} {order.items.length > 1 ? `+ ${order.items.length - 1} other items` : ''}</strong></div><div><small>Total Amount</small><strong>{order.total} ETB</strong></div></div>
              <div className="order-card-actions"><button type="button" className="text-link">View Details & Receipt</button><Link to="/menu" className="primary-button small-button">Reorder</Link></div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
