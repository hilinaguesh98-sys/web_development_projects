import { redirect } from 'next/navigation'
import { getOrders } from '../../lib/orders'
import { getSession } from '../../lib/session'
import DashboardCharts from './DashboardCharts'
import { createOpenGraphMetadata } from '../../lib/site'

const title = 'Sales Dashboard'
const description = 'Staff reporting for Addis Eats orders, revenue, and neighbourhood activity.'

export const metadata = {
  title,
  description,
  openGraph: createOpenGraphMetadata(`${title} | AddisEats`, description, '/dashboard'),
  robots: { index: false, follow: false },
}

const money = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

function getOrderDate(order) {
  const timestamp = Number(order.createdAt)
  if (Number.isFinite(timestamp) && timestamp > 0) return new Date(timestamp)
  const parsed = new Date(order.date || '')
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Fdashboard')
  if (session.role !== 'staff') redirect('/orders')

  const orders = getOrders()
  const revenueByNeighborhood = new Map()
  const ordersByDay = new Map()

  for (const order of orders) {
    const neighborhood = String(order.neighborhood || 'Not provided').trim() || 'Not provided'
    revenueByNeighborhood.set(neighborhood, (revenueByNeighborhood.get(neighborhood) || 0) + Number(order.total || 0))

    const date = getOrderDate(order)
    if (date) {
      const key = date.toISOString().slice(0, 10)
      const current = ordersByDay.get(key) || { date: key, label: date.toLocaleDateString('en-ET', { month: 'short', day: 'numeric', timeZone: 'UTC' }), orders: 0 }
      current.orders += 1
      ordersByDay.set(key, current)
    }
  }

  const revenueData = [...revenueByNeighborhood.entries()]
    .map(([neighborhood, revenue]) => ({ neighborhood, revenue }))
    .sort((a, b) => b.revenue - a.revenue)

  const today = new Date()
  const dailyData = []
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - offset))
    const key = date.toISOString().slice(0, 10)
    dailyData.push(ordersByDay.get(key) || {
      date: key,
      label: date.toLocaleDateString('en-ET', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      orders: 0,
    })
  }

  const revenueTotal = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const deliveredCount = orders.filter((order) => order.status === 'Delivered').length

  return <div className="page-wrap container dashboard-page">
    <div className="page-title">
      <p className="eyebrow">STAFF REPORTING</p>
      <h1>Sales dashboard</h1>
      <p>Review revenue by neighbourhood and order activity over the last 14 days.</p>
    </div>
    <div className="dashboard-summary">
      <section><span>Total orders</span><strong>{orders.length.toLocaleString('en-ET')}</strong></section>
      <section><span>Total order value</span><strong>{money.format(revenueTotal)}</strong></section>
      <section><span>Delivered orders</span><strong>{deliveredCount.toLocaleString('en-ET')}</strong></section>
    </div>
    {orders.length ? <DashboardCharts revenueData={revenueData} dailyData={dailyData} /> : <div className="empty"><h2>No orders to report yet</h2><p className="muted">Charts will appear after customers place orders.</p></div>}
  </div>
}