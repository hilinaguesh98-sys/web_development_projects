'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { etb, relative, when } from '../../../lib/format'
import '../tracking.css'

const DeliveryMap = dynamic(() => import('./DeliveryMap'), {
  ssr: false,
  loading: () => <div className="delivery-map-placeholder" role="status">Loading delivery map…</div>,
})

const finishedStatuses = new Set(['Delivered', 'Cancelled'])

export default function TrackingClient({ initialOrder }) {
  const [status, setStatus] = useState(initialOrder.status)
  const [updatedAt, setUpdatedAt] = useState(initialOrder.createdAt || Date.now())
  const [connection, setConnection] = useState(finishedStatuses.has(initialOrder.status) ? 'closed' : 'connecting')
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (finishedStatuses.has(status)) {
      setConnection('closed')
      return undefined
    }

    const source = new EventSource(`/api/orders/${encodeURIComponent(initialOrder.id)}/stream`)
    source.onopen = () => setConnection('connected')
    source.onerror = () => setConnection('reconnecting')
    const onStatus = (event) => {
      try {
        const payload = JSON.parse(event.data)
        setStatus(payload.status)
        setUpdatedAt(payload.updatedAt || Date.now())
        if (finishedStatuses.has(payload.status)) {
          source.close()
          setConnection('closed')
        }
      } catch {
        setConnection('reconnecting')
      }
    }
    source.addEventListener('status', onStatus)

    return () => {
      source.removeEventListener('status', onStatus)
      source.close()
    }
  }, [initialOrder.id, status])

  const connectionLabel = connection === 'connected'
    ? 'Live updates connected'
    : connection === 'reconnecting'
      ? 'Reconnecting to live updates…'
      : connection === 'closed'
        ? status === 'Delivered' ? 'Delivery complete' : 'Live updates closed'
        : 'Connecting to live updates…'

  return <div className="page-wrap container">
    <Link className="back" href={`/orders/${encodeURIComponent(initialOrder.id)}`}>← Order details</Link>
    <div className="page-title">
      <p className="eyebrow">LIVE DELIVERY TRACKING</p>
      <h1>Order #{initialOrder.id}</h1>
      <p>Follow your delivery status and review the delivery location details.</p>
    </div>
    <section className="tracking-live-status" aria-live="polite">
      <div><span className="tracking-status-label">Current status</span><h2>{status}</h2><p>Updated {relative(updatedAt, now)} · {when(updatedAt)}</p></div>
      <span className={`tracking-connection tracking-connection-${connection}`} role="status"><span aria-hidden="true">●</span> {connectionLabel}</span>
    </section>
    <div className="delivery-tracking-layout">
      <section className="delivery-map-panel">
        <h2>Courier and delivery area</h2>
        <DeliveryMap neighborhood={initialOrder.neighborhood} address={initialOrder.address} />
      </section>
      <aside className="delivery-address-panel" aria-labelledby="delivery-address-heading">
        <h2 id="delivery-address-heading">Delivery information</h2>
        <dl>
          <div><dt>Recipient</dt><dd>{initialOrder.name}</dd></div>
          <div><dt>Phone</dt><dd>{initialOrder.phone}</dd></div>
          <div><dt>Neighbourhood</dt><dd>{initialOrder.neighborhood || 'Not provided'}</dd></div>
          <div><dt>Delivery address</dt><dd>{initialOrder.address}</dd></div>
          <div><dt>Order placed</dt><dd>{when(initialOrder.createdAt || initialOrder.date)}</dd></div>
        </dl>
        <div className="tracking-order-total"><span>Order total</span><strong>{etb(initialOrder.total)}</strong></div>
        <p className="delivery-map-note">The map pin is an approximate neighbourhood demo position, not GPS tracking. The address above is the delivery address saved with your order.</p>
        <Link className="orange-button" href="/orders">View order history</Link>
      </aside>
    </div>
  </div>
}
