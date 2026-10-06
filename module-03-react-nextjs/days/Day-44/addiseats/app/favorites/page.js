import FavoritesClient from './FavoritesClient'

export const metadata = {
  title: 'Saved Favorites',
  description: 'Keep the Addis Eats meals you love in one place and find them quickly when you are ready to order again.',
  robots: { index: false, follow: false },
}

export default function FavoritesPage() {
  return <FavoritesClient />
}
