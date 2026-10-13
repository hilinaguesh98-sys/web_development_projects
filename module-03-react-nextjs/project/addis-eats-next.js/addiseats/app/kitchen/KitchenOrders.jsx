'use client'

import { useEffect, useState, useTransition } from 'react'
import { getOrderStatus, ORDER_STATUSES } from '../../lib/order-statuses'
import { updateOrderStatus } from '../actions'
import { etb, when } from '../../lib/format'

export default function KitchenOrders({ orders }) {
  const [pendingOrder, setPendingOrder] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function changeStatus(orderId, status) {
    setError('')
    setPendingOrder(orderId)
    startTransition(async () => {
      try {
        const result = await updateOrderStatus(orderId, status)
        setError(result.error || '')
      } catch {
        setError('The order status could not be updated. Please try again.')
      } finally {
        setPendingOrder('')
      }
    })
  }

  if (!orders.length) return <div className="empty"><h2>No orders yet</h2></div>

  return <>
    {error ? <p className="error-box" role="alert">{error}</p> : null}
    {orders.map((order) => {
      const status = getOrderStatus(order)
      return <section className="order-status-panel" key={order.id}>
      <div className="order-status-heading">
        <div><span>Order #{order.id}</span><h2>{status}</h2><span>Updated {when(order.updatedAt)} (EAT)</span></div>
        <strong>{etb(order.total)}</strong>
      </div>
      <p>{order.items.map((item) => `${item.qty} × ${item.name}`).join(', ')}</p>
      <p className="order-updated">{order.name} · {order.phone} · {order.neighborhood || 'Neighbourhood not provided'} · {order.address}</p>
      <label>Update status
        <select
          value={status}
          disabled={(isPending && pendingOrder === order.id) || ['Delivered', 'Cancelled'].includes(status)}
          onChange={(event) => changeStatus(order.id, event.target.value)}
          aria-label={`Update status for order ${order.id}`}
        >
          {ORDER_STATUSES.map((status) => <option value={status} key={status}>{status}</option>)}
        </select>
      </label>
    </section>
    })}
  </>
}
