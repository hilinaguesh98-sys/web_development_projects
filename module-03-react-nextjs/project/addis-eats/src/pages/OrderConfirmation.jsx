import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;
  const total = order?.total || 0;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card confirmation-detail-card">
        <div className="success-badge">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order. We are preparing your delicious feast.</p>
        <div className="confirmation-details">
          <div><span>Order Number</span><strong>#{order?.id ? String(order.id).slice(-4) : 'A12'}</strong></div>
          <div><span>Estimated Delivery Time</span><strong className="accent-text">10–15 seconds</strong></div>
          <div><span>Total Amount Paid</span><strong className="accent-text">{total || '1,580'} ETB</strong></div>
        </div>
        <div className="confirmation-actions"><Link to="/orders" className="primary-button">Track Order</Link><Link to="/menu" className="secondary-button">Back to Menu</Link></div>
      </div>
    </div>
  );
}
