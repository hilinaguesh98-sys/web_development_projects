'use client'

import { downloadCsv } from '../../lib/csv'
import { etb, when } from '../../lib/format'

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'date', label: 'Order date' },
  { key: 'name', label: 'Customer' },
  { key: 'phone', label: 'Phone' },
  { key: 'neighborhood', label: 'Neighbourhood' },
  { key: 'address', label: 'Delivery address' },
  { key: 'status', label: 'Status' },
  { key: 'total', label: 'Total (ETB)' },
]

export default function CsvExportButton({ orders }) {
  const exportOrders = () => {
    const rows = orders.map((order) => ({
      id: order.id,
      date: when(order.createdAt || order.date),
      name: order.name,
      phone: order.phone,
      neighborhood: order.neighborhood || 'Not provided',
      address: order.address,
      status: order.status,
      total: etb(order.total),
    }))
    downloadCsv('addiseats-order-history.csv', rows, columns)
  }

  return <button className="csv-export-button" type="button" onClick={exportOrders}>Export order history CSV</button>
}
