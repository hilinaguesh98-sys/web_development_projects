import { useState } from 'react';

const statuses = ['Preparing', 'Ready', 'Delivered', 'Cancelled'];
const DELIVERED_AFTER = 15 * 1000;
const formatOrderNumber = (id) => `AE${String(id).slice(-4)}`;

function getOrderStatus(order) {
  if (order.status) return order.status;
  return Date.now() - new Date(order.createdAt).getTime() >= DELIVERED_AFTER ? 'Delivered' : 'Pending';
}

export default function OrderManager() {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('addisEatsOrders') || '[]').reverse());
  const [selected, setSelected] = useState(null);
  const persist = (nextOrders) => { setOrders(nextOrders); localStorage.setItem('addisEatsOrders', JSON.stringify([...nextOrders].reverse())); };
  const updateStatus = (id, status) => persist(orders.map((order) => order.id === id ? { ...order, status } : order));
  const deleteOrder = (id) => { if (window.confirm('Delete this order?')) persist(orders.filter((order) => order.id !== id)); };

  return (
    <section className="admin-section">
      <div className="admin-heading"><div><p className="eyebrow"></p><h2>Orders</h2></div><span className="subtle-text">{orders.length} total</span></div>
      <div className="admin-table-wrap"><table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{formatOrderNumber(order.id)}</td>
              <td>{order.customerName}<small>{order.area}</small></td>
              <td>{order.total} ETB</td>
              <td>
                <select value={getOrderStatus(order)} onChange={(event) => updateStatus(order.id, event.target.value)} aria-label={`Status for order ${order.id}`}>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="text-button" type="button" onClick={() => setSelected(order)}>
                  Details
                </button>
                <button className="danger-button" type="button" onClick={() => deleteOrder(order.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
      {selected && (
        <div className="admin-detail-panel">
          <button className="text-button" type="button" onClick={() => setSelected(null)}>
            Close
          </button>
          <h3>Order {formatOrderNumber(selected.id)}</h3>
          <p>{selected.customerName} · {selected.phone} · {selected.area}</p>
          <ul>
            {selected.items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
          <strong>Total: {selected.total} ETB</strong>
        </div>
      )}
    </section>
  );
}