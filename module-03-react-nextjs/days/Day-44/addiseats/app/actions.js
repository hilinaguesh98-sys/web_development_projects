'use server'

import { getDish } from '../lib/data'
import { createOrder } from '../lib/orders'
import { getSession } from '../lib/session'

export async function placeOrder(input) {
  const session = await getSession()
  if (!session) return { error: 'Sign in before placing an order.' }

  const name = String(input?.name || '').trim()
  const phone = String(input?.phone || '').trim()
  const address = String(input?.address || '').trim()
  if (!name || !phone || !address) return { error: 'Name, phone and address are required.' }
  if (!Array.isArray(input?.items) || input.items.length === 0) return { error: 'Your cart is empty.' }
  const items = input.items.map((item) => ({ id: String(item.id), qty: Number(item.qty) }))
  for (const item of items) {
    if (!getDish(item.id) || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 20) return { error: 'Invalid cart item.' }
  }
  return { order: createOrder({ items, name, phone, address, userId: session.id }) }
}
