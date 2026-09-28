import { NextResponse } from 'next/server'
import { createOrder, getOrders } from '../../../lib/orders'
import { getDish } from '../../../lib/data'

export async function GET() {
  return NextResponse.json({ orders: getOrders() })
}

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.name || !body.phone || !body.address || !Array.isArray(body.items) || !body.items.length) return NextResponse.json({ error:'name, phone, address and items are required' }, { status:400 })
    const items = body.items.map((item) => ({ id:String(item.id), qty:Number(item.qty) }))
    for (const item of items) if (!getDish(item.id) || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 20) return NextResponse.json({ error:'Invalid item or quantity' }, { status:400 })
    const order = createOrder({ ...body, items })
    return NextResponse.json({ order }, { status:201 })
  } catch {
    return NextResponse.json({ error:'Invalid request body' }, { status:400 })
  }
}
