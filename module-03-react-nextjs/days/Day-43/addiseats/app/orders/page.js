import { redirect } from 'next/navigation'
import { getOrdersForUser } from '../../lib/orders'
import { getSession } from '../../lib/session'
import OrdersList from './OrdersList'

export default async function OrdersPage() {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Forders')

  return <OrdersList orders={getOrdersForUser(session.id)}/>
}
