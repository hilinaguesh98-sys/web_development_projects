import { getOrderForUser } from '../../../../../lib/orders'
import { getSession } from '../../../../../lib/session'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const encoder = new TextEncoder()
const terminalStatuses = new Set(['Delivered', 'Cancelled'])

function eventMessage(order) {
  return `event: status\ndata: ${JSON.stringify({
    orderId: order.id,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: Date.now(),
  })}\n\n`
}

export async function GET(request, { params }) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const initialOrder = getOrderForUser(id, session.id)
  if (!initialOrder) return Response.json({ error: 'Order not found' }, { status: 404 })

  let intervalId
  let closed = false
  const stream = new ReadableStream({
    start(controller) {
      const send = (order) => {
        if (closed) return
        controller.enqueue(encoder.encode(eventMessage(order)))
        if (terminalStatuses.has(order.status)) {
          closed = true
          if (intervalId) clearInterval(intervalId)
          controller.close()
        }
      }

      send(initialOrder)
      if (closed) return

      intervalId = setInterval(() => {
        if (request.signal.aborted) {
          closed = true
          clearInterval(intervalId)
          controller.close()
          return
        }
        const order = getOrderForUser(id, session.id)
        if (!order) {
          closed = true
          clearInterval(intervalId)
          controller.close()
          return
        }
        send(order)
      }, 3000)
    },
    cancel() {
      closed = true
      if (intervalId) clearInterval(intervalId)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
