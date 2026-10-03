import { notFound } from 'next/navigation'
import { getOrder } from '../../../lib/orders'
import OrderStatus from './OrderStatus'

export const dynamic = 'force-dynamic'

export default async function OrderPage({ params }) {
  const { id } = await params
  const order = getOrder(id)

  if (!order) notFound()

  return <OrderStatus initialOrder={order} />
}