import { redirect } from 'next/navigation'
import { getOrdersForUser } from '../../lib/orders'
import { getSession } from '../../lib/session'
import OrdersList from './OrdersList'

export const metadata = {
  title: 'Your Orders',
  description: 'See the status and details of your Addis Eats orders in one convenient place.',
  robots: { index: false, follow: false },
}

export default async function OrdersPage() {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Forders')

  return <OrdersList orders={getOrdersForUser(session.id)}/>
}
