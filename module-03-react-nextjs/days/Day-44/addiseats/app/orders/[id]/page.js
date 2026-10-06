import { notFound, redirect } from 'next/navigation'
import { getOrderForUser } from '../../../lib/orders'
import { getSession } from '../../../lib/session'
import OrderStatus from './OrderStatus'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'Order Status',
    description: 'Check the latest status and details for your Addis Eats delivery.',
    robots: { index: false, follow: false },
  }
}

export default async function OrderPage({ params }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`)
  const order = getOrderForUser(id, session.id)

  if (!order) notFound()

  return <OrderStatus initialOrder={order} />
}