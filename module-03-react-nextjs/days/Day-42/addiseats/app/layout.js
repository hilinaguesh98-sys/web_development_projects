import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getSession } from '../lib/session'

export const metadata = { title:'AddisEats', description:'Ethiopian food delivery platform' }

export default async function RootLayout({ children }) {
  const session = await getSession()
  return <html lang="en"><body><Header session={session}/><main>{children}</main><Footer/></body></html>
}
