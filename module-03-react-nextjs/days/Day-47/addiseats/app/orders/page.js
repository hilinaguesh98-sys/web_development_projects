import { redirect } from 'next/navigation'
import { getOrdersForUser } from '../../lib/orders'
import { getOrderStatus } from '../../lib/order-statuses'
import { getSession } from '../../lib/session'
import OrdersList from './OrdersList'
import { createOpenGraphMetadata } from '../../lib/site'

const title = 'Your Orders'
const description = 'See the status and details of your Addis Eats orders in one convenient place.'
const PAGE_SIZE = 20

export const metadata = {
  title,
  description,
  openGraph: createOpenGraphMetadata(`${title} | AddisEats`, description, '/orders'),
  robots: { index: false, follow: false },
}

export default async function OrdersPage({ searchParams }) {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Forders')

  const params = await searchParams
  const allowedSorts = ['date', 'total', 'status', 'neighborhood']
  const sort = allowedSorts.includes(params?.sort) ? params.sort : 'date'
  const dir = params?.dir === 'asc' ? 'asc' : 'desc'
  const statusFilter = params?.status === 'past' ? 'past' : 'active'
  const requestedPage = Math.max(1, Number.parseInt(params?.page || '1', 10) || 1)
  const allOrders = getOrdersForUser(session.id)
  const filtered = allOrders.filter((order) => {
    const status = getOrderStatus(order)
    const past = ['Delivered', 'Cancelled'].includes(status)
    return statusFilter === 'past' ? past : !past
  })

  const valueFor = (order) => {
    if (sort === 'total') return Number(order.total) || 0
    if (sort === 'status') return getOrderStatus(order).toLowerCase()
    if (sort === 'neighborhood') return String(order.neighborhood || 'Not provided').toLowerCase()
    return Number(order.createdAt) || 0
  }

  filtered.sort((a, b) => {
    const first = valueFor(a)
    const second = valueFor(b)
    const result = typeof first === 'string' ? first.localeCompare(second) : first - second
    return dir === 'asc' ? result : -result
  })

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(requestedPage, pageCount)
  const orders = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return <div className="page-wrap container">
    <div className="page-title">
      <p className="eyebrow">ORDER HISTORY</p>
      <h1>My Orders</h1>
      <p>View and track your recent orders.</p>
    </div>
    <OrdersList orders={orders} exportOrders={allOrders} page={page} pageCount={pageCount} sort={sort} dir={dir} statusFilter={statusFilter} totalCount={filtered.length} hasAnyOrders={allOrders.length > 0} />
  </div>
}
