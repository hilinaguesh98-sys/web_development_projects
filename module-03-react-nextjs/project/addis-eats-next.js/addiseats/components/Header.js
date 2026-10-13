'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Header({ session }) {
  const pathname = usePathname()
  const showWordmark = !pathname.startsWith('/menu')
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [signOutError, setSignOutError] = useState('')
  const mobileMenuButton = useRef(null)

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('addisEatsCart') || '[]')
        setCartCount(Array.isArray(cart) ? cart.reduce((sum, item) => sum + Number(item.qty || 0), 0) : 0)
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
    ['Orders', '/orders'],
    ...(session?.role === 'staff' ? [['Kitchen', '/kitchen'], ['Dashboard', '/dashboard']] : [])
  ]

  async function signOut() {
    setSignOutError('')
    try {
      const response = await fetch('/api/auth', { method: 'DELETE' })
      if (!response.ok) throw new Error('Sign-out request failed.')
      window.location.assign('/')
    } catch {
      setSignOutError('Sign out could not be completed. Please try again.')
    }
  }

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      mobileMenuButton.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="AddisEats home">
          {showWordmark
            ? <Image src="/addiseats-logo.png" alt="AddisEats" width={231} height={89} style={{ width: 170, height: 'auto' }} />
            : <>Addis<span>Eats</span></>}
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return <Link key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>{label}</Link>
          })}
        </nav>
        <div className="header-actions">
          <Link className="header-icon" href="/menu" aria-label="Search the menu">⌕</Link>
          <Link href="/cart" className="cart-link" aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>Cart{cartCount > 0 && <span aria-hidden="true">{cartCount}</span>}</Link>
          {session ? <button type="button" className="auth-button" onClick={signOut}>Sign out</button> : <Link className="auth-button" href="/signin">Sign in</Link>}
          <button ref={mobileMenuButton} className="mobile-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">☰</button>
        </div>
      </div>
      {signOutError && <p className="header-error" role="alert">{signOutError}</p>}
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
        {session ? <button type="button" onClick={signOut}>Sign out</button> : <Link href="/signin" onClick={() => setOpen(false)}>Sign in</Link>}
      </nav>}
    </header>
  )
}
