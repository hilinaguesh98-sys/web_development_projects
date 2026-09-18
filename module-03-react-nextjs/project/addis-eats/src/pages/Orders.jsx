import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/useCart';

const PREPARING_DURATION = 5 * 1000;
const READY_DURATION = 10* 1000;
const DELIVERING_DURATION = 15 * 1000;
const formatOrderNumber = (id) => `AE${String(id).slice(-4)}`;

function getOrderStatus(order, now) {
  if (order.status) return order.status;

  const createdAt = order.createdAt;
  const elapsed = now - new Date(createdAt).getTime();

  if (elapsed < PREPARING_DURATION) {
    return 'Preparing';
  }

  if (elapsed < READY_DURATION) {
    return 'Food is done';
  }

  if (elapsed < DELIVERING_DURATION) {
    return 'Being delivered';
  }

  return 'Delivered';
}

function isActiveStatus(status) {
  return status !== 'Delivered' && status !== 'Cancelled';
}

function readOrders() {
  return JSON.parse(localStorage.getItem('addisEatsOrders') || '[]').reverse();
}

function addOrderToCart(order, addToCart) {
  order.items.forEach((item) => {
    for (let quantity = 0; quantity < item.quantity; quantity += 1) {
      addToCart(item);
    }
  });
}

export default function Orders() {
  const [orders, setOrders] = useState(readOrders);
  const [now, setNow] = useState(() => Date.now());
  const [selectedTab, setSelectedTab] = useState('active');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'addisEatsOrders') setOrders(readOrders());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const visibleOrders = useMemo(
    () => orders.filter((order) => {
      const status = getOrderStatus(order, now);
      return selectedTab === 'active' ? isActiveStatus(status) : !isActiveStatus(status);
    }),
    [now, orders, selectedTab],
  );

  const handleReorder = (order) => {
    addOrderToCart(order, addToCart);
    navigate('/checkout');
  };

  return (
    <div className="container page-section simple-page orders-page">
      <div className="page-heading-row"><div><h1>My Orders</h1><p className="page-intro">Review and track your current orders or reorder past favorites.</p></div><div className="segmented-control" role="tablist" aria-label="Order history"><button type="button" role="tab" aria-selected={selectedTab === 'active'} className={selectedTab === 'active' ? 'active' : ''} onClick={() => setSelectedTab('active')}>Active Orders</button><button type="button" role="tab" aria-selected={selectedTab === 'past'} className={selectedTab === 'past' ? 'active' : ''} onClick={() => setSelectedTab('past')}>Past Orders</button></div></div>
      {visibleOrders.length === 0 ? (
        <div className="empty-state"><h3>{selectedTab === 'active' ? 'No active orders' : 'No past orders'}</h3><Link to="/menu" className="primary-button">Start Ordering</Link></div>
      ) : (
        <div className="orders-list">
          {visibleOrders.map((order) => {
            const status = getOrderStatus(order, now);

            return (
              <article className="order-card" key={order.id}>
                <div className="order-card-top"><strong>Order {formatOrderNumber(order.id)}</strong><span>Placed on: {new Date(order.createdAt).toLocaleDateString()}</span><b className={`status-pill status-${status.toLowerCase().replaceAll(' ', '-')}`} aria-live="polite">{status}</b></div>
                <div className="order-card-main"><div className="order-thumbnails">{order.items.slice(0, 3).map((item) => <img key={item.id} src={item.image} alt="" />)}<strong>{order.items[0]?.name} {order.items.length > 1 ? `+ ${order.items.length - 1} other items` : ''}</strong></div><div><small>Total Amount</small><strong>{order.total} ETB</strong></div></div>
                <div className="order-card-actions"><button type="button" className="text-link">View Details & Receipt</button><button type="button" className="primary-button small-button" onClick={() => handleReorder(order)}>Reorder</button></div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
