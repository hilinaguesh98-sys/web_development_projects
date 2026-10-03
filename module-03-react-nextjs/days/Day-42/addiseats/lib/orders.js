import { dishes, getImageUrl } from './data'

const store = globalThis.__addisOrders || (globalThis.__addisOrders = new Map())

export function createOrder(payload) {
  if (!payload.userId) throw new Error('An authenticated order owner is required.')

  const items = payload.items.map((item) => {
    const dish = dishes.find((entry) => entry.id === item.id)
    if (!dish) return null
    return { id: dish.id, name: dish.name, price: dish.price, image: getImageUrl(dish.image), qty: Number(item.qty) }
  }).filter(Boolean)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + 80
  const id = `AE-${Math.floor(1000 + Math.random() * 9000)}`
  const order = { id, userId: payload.userId, name: payload.name, phone: payload.phone, address:
     payload.address, items, subtotal, delivery: 80, total, status: 'Preparing', date: 
     new Date().toLocaleString('en-US',
       { month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit' })
       , createdAt: Date.now() }
  store.set(id, order)
  return publicOrder(order)
}

function publicOrder({ userId, ...order }) {
  return order
}

export function getOrderForUser(id, userId) {
  const order = store.get(id)
  return order?.userId === userId ? publicOrder(order) : null
}

export function getOrdersForUser(userId) {
  return [...store.values()]
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(publicOrder)
}

export function getOrders() {
  return [...store.values()].sort((a, b) => b.createdAt - a.createdAt).map(publicOrder)
}
