import { dishes, getImageUrl } from './data'

const store = globalThis.__addisOrders || (globalThis.__addisOrders = new Map())

export function createOrder(payload) {
  const items = payload.items.map((item) => {
    const dish = dishes.find((entry) => entry.id === item.id)
    if (!dish) return null
    return { id: dish.id, name: dish.name, price: dish.price, image: getImageUrl(dish.image), qty: Number(item.qty) }
  }).filter(Boolean)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + 80
  const id = `AE-${Math.floor(1000 + Math.random() * 9000)}`
  const order = { id, name: payload.name, phone: payload.phone, address: payload.address, items, subtotal, delivery: 80, total, status: 'Preparing', date: new Date().toLocaleString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit' }), createdAt: Date.now() }
  store.set(id, order)
  return order
}

export function getOrder(id) { return store.get(id) }
export function getOrders() { return [...store.values()].sort((a, b) => b.createdAt - a.createdAt) }
