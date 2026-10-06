import CheckoutClient from './CheckoutClient'

export const metadata = {
  title: 'Checkout',
  description: 'Enter your delivery details and confirm your Addis Eats order securely.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
