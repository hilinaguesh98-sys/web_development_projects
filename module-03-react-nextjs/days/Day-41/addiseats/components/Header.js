'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('addisEatsCart') || '[]')
        setCartCount(cart.reduce((sum, item) => sum + Number(item.qty || 0), 0))
      } catch {
        setCartCount(0)
      }
    }
    update()
    window.addEventListener('addis-cart-updated', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('addis-cart-updated', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  const links = [
    ['Home', '/'],
    ['Menu', '/menu'],
    ['Favorites', '/favorites'],
    ['Orders', '/orders']
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">Addis<span>Eats</span></Link>
        <nav className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'active' : ''}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="header-icon" aria-label="Search"></button>
          <Link href="/cart" className="cart-link" aria-label="Cart">cart♧{cartCount > 0 && <span>{cartCount}</span>}</Link>
          <button className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Open menu">☰</button>
        </div>
      </div>
      {open && <nav className="mobile-nav">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/cart" onClick={() => setOpen(false)}>Cart</Link></nav>}
    </header>
  )
}
