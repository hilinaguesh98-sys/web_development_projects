import { redirect } from 'next/navigation'
import { getOrders } from '../../lib/orders'
import { getSession } from '../../lib/session'

export default async function KitchenPage() {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Fkitchen')
  if (session.role !== 'staff') redirect('/orders')

  const orders = getOrders()

  return <div className="page-wrap container"><div className="page-title"><p className="eyebrow">STAFF ONLY</p><h1>Kitchen orders</h1><p>Active orders across Addis Eats.</p></div>{orders.length ? orders.map((order) => <section className="order-status-panel" key={order.id}><div className="order-status-heading"><div><span>Order #{order.id}</span><h2>{order.status}</h2></div><strong>{order.total.toLocaleString()} ETB</strong></div><p>{order.items.map((item) => `${item.qty} × ${item.name}`).join(', ')}</p><p className="order-updated">{order.name} · {order.phone} · {order.address}</p></section>) : <div className="empty"><h2>No orders yet</h2></div>}</div>
}