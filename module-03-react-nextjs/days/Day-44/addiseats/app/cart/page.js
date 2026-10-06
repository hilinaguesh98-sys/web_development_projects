import CartClient from '../../components/CartClient'

export const metadata = {
  title: 'Your Cart',
  description: 'Review your selected Addis Eats dishes, adjust quantities, and see your delivery total before checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() { 
  return <div className="page-wrap container"><CartClient /></div>
}
