'use client'

import { useMemo, useState } from 'react'
import DishCard from '../../components/DishCard'
import { categories, dishes } from '../../lib/data'

export default function MenuPage() {
  const [category, setCategory] = useState('ethiopian')
  const [sort, setSort] = useState('popular')
  const [search, setSearch] = useState('')

  const shown = useMemo(() => {
    let result = dishes.filter((dish) => (category === 'all' || dish.category === category) && dish.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category, search, sort])

  return <div className="page-wrap container">
    <div className="page-title"><p className="eyebrow">EXPLORE OUR MENU</p><h1>Our Menu</h1><p>Freshly prepared dishes inspired by Ethiopia and loved around Addis Ababa.</p></div>
    <div className="menu-layout">
      <aside className="category-box"><h4>CATEGORIES</h4>{categories.map((item) => <button key={item.id} className={category === item.id ? 'cat-active' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>)}</aside>
      <section>
        <div className="menu-toolbar"><div className="menu-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes..."/></div><div className="sort-area"><span>{shown.length} dishes</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Sort: Popular</option><option value="low">Price: Low</option><option value="high">Price: High</option></select></div></div>
        {shown.length ? <div className="dish-grid menu-grid">{shown.map((dish) => <DishCard key={dish.id} dish={dish}/>)}</div> : <div className="empty"><div className="empty-icon">⌕</div><h2>No dishes found</h2><p className="muted">Try another category or search term.</p></div>}
      </section>
    </div>
  </div>
}
