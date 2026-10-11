import Link from 'next/link'
import { getOrderStatus } from '../../lib/order-statuses'
import CsvExportButton from './CsvExportButton'
import { etb } from '../../lib/format'

function queryHref({ page, sort, dir, statusFilter }) {
  const params = new URLSearchParams()
  params.set('status', statusFilter)
  params.set('sort', sort)
  params.set('dir', dir)
  params.set('page', String(page))
  return `/orders?${params.toString()}`
}

function sortHref(column, currentSort, currentDir, statusFilter) {
  const nextDir = currentSort === column && currentDir === 'asc' ? 'desc' : 'asc'
  return queryHref({ page: 1, sort: column, dir: nextDir, statusFilter })
}

export default function OrdersList({ orders, exportOrders = orders, page, pageCount, sort, dir, statusFilter, totalCount, hasAnyOrders }) {
  if (!hasAnyOrders || totalCount === 0) {
    const title = !hasAnyOrders ? 'You have not placed an order yet' : statusFilter === 'active' ? 'No active orders' : 'No past orders'
    return <div className="empty">
      <div className="empty-icon"></div>
      <h2>{title}</h2>
      <p className="muted">{!hasAnyOrders ? 'Explore the menu and place your first order.' : 'Try the other order-history tab or browse the menu.'}</p>
      <div className="order-empty-actions">
        <Link className="orange-button" href="/menu">Browse Menu</Link>
        {hasAnyOrders && <Link className="secondary-button" href={queryHref({ page: 1, sort, dir, statusFilter: statusFilter === 'active' ? 'past' : 'active' })}>View {statusFilter === 'active' ? 'past' : 'active'} orders</Link>}
        {hasAnyOrders && <CsvExportButton orders={exportOrders} />}
      </div>
    </div>
  }

  const columns = [
    { key: 'date', label: 'Order date' },
    { key: 'neighborhood', label: 'Neighbourhood' },
    { key: 'status', label: 'Status' },
    { key: 'total', label: 'Total' },
  ]

  return <section className="orders-table-section">
    <div className="orders-table-toolbar">
      <nav className="order-tabs" aria-label="Order history filter">
        <Link className={statusFilter === 'active' ? 'active' : ''} href={queryHref({ page: 1, sort, dir, statusFilter: 'active' })}>Active Orders</Link>
        <Link className={statusFilter === 'past' ? 'active' : ''} href={queryHref({ page: 1, sort, dir, statusFilter: 'past' })}>Past Orders</Link>
      </nav>
      <div className="orders-toolbar-actions"><p>{totalCount} {totalCount === 1 ? 'order' : 'orders'}</p><CsvExportButton orders={exportOrders} /></div>
    </div>
    <div className="semantic-table-wrap">
      <table className="semantic-orders-table">
        <caption>{statusFilter === 'active' ? 'Your active orders' : 'Your past orders'} sorted by {sort}, {dir === 'asc' ? 'ascending' : 'descending'}</caption>
        <thead>
          <tr>
            <th scope="col">Order</th>
            {columns.map((column) => <th scope="col" key={column.key} aria-sort={sort === column.key ? dir === 'asc' ? 'ascending' : 'descending' : 'none'}>
              <Link href={sortHref(column.key, sort, dir, statusFilter)}>{column.label}{sort === column.key ? dir === 'asc' ? ' ↑' : ' ↓' : ''}</Link>
            </th>)}
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const status = getOrderStatus(order)
            return <tr key={order.id}>
              <th scope="row">#{order.id}</th>
              <td>{order.date || 'Date unavailable'}</td>
              <td>{order.neighborhood || 'Not provided'}</td>
              <td><span className="table-status">{status}</span></td>
              <td>{etb(order.total)}</td>
              <td><Link className="table-link" href={`/orders/${encodeURIComponent(order.id)}`}>View order</Link></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    <nav className="pagination" aria-label="Order pages">
      <span>Page {page} of {pageCount}</span>
      <div>
        <Link aria-disabled={page <= 1} className={page <= 1 ? 'disabled' : ''} href={queryHref({ page: Math.max(1, page - 1), sort, dir, statusFilter })}>Previous</Link>
        <Link aria-disabled={page >= pageCount} className={page >= pageCount ? 'disabled' : ''} href={queryHref({ page: Math.min(pageCount, page + 1), sort, dir, statusFilter })}>Next</Link>
      </div>
    </nav>
  </section>
}
