import OrderConfirmationClient from './OrderConfirmationClient'

export const metadata = {
  title: 'Order Confirmation',
  description: 'View the confirmation and delivery estimate for your Addis Eats order.',
  robots: { index: false, follow: false },
}

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />
}
