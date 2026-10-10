import './globals.css'
import { Manrope } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getSession } from '../lib/session'

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' })

export const metadata = {
  title: 'AddisEats',
  description: 'Ethiopian food delivery platform',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default async function RootLayout({ children }) {
  const session = await getSession()
  return <html lang="en"><body className={manrope.variable}><Header session={session}/><main>{children}</main><Footer/></body></html>
}
