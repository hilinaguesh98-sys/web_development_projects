'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '../../../lib/fetcher'

export default function OrderStatus({ initialOrder }) {
  const { data, error } = useSWR(`/api/orders/${initialOrder.id}`, fetcher, {
    fallbackData: { order: initialOrder },
    refreshInterval: 5000,
    revalidateOnFocus: false,
    dedupingInterval: 1000
  })
  const order = data?.order || initialOrder

  return <div className="page-wrap container">
    <Link className="back" href="/orders">← All orders</Link>
    <div className="order-status-page">
      <div className="page-title"><p className="eyebrow">ORDER TRACKING</p><h1>Order #{order.id}</h1><p>Track your meal as it moves through the kitchen.</p></div>
      {error ? <p className="muted" role="status">Live updates are temporarily unavailable. Showing the latest saved status.</p> : null}
      <section className="order-status-panel" aria-live="polite">
        <div className="order-status-heading"><div><span>Current status</span><h2>{order.status}</h2></div><span className="status">{order.status}</span></div>
        <div className="order-status-progress"><span className={order.status === 'Preparing' ? 'current' : 'complete'}>Received</span><span className={['Preparing', 'Ready', 'Out for delivery', 'Delivered'].includes(order.status) ? 'current' : ''}>Preparing</span><span className={['Ready', 'Out for delivery', 'Delivered'].includes(order.status) ? 'current' : ''}>On the way</span><span className={order.status === 'Delivered' ? 'current' : ''}>Delivered</span></div>
        <p className="order-updated">Status refreshes automatically every five seconds.</p>
      </section>
      <section className="order-status-panel">
        <h2>Order details</h2>
        <div className="tracking-items">{order.items.map((item) => <div className="tracking-item" key={item.id}><span>{item.qty} × {item.name}</span><strong>{(item.price * item.qty).toLocaleString()} ETB</strong></div>)}</div>
        <div className="tracking-total"><span>Total</span><strong>{order.total.toLocaleString()} ETB</strong></div>
        <p className="order-updated">Delivering to {order.address}</p>
      </section>
    </div>
  </div>
}