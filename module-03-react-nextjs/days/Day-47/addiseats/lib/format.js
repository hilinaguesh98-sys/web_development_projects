const etbFormatter = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-ET', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function toDate(value) {
  if (value instanceof Date) return value
  if (typeof value === 'number') return new Date(value)
  return new Date(value)
}

export function etb(value) {
  return etbFormatter.format(Number(value) || 0)
}

export function when(value) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return dateFormatter.format(date)
}

export function relative(value, now = Date.now()) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return 'Time unavailable'
  const seconds = Math.round((date.getTime() - now) / 1000)
  const absoluteSeconds = Math.abs(seconds)
  if (absoluteSeconds < 60) return relativeFormatter.format(seconds, 'second')
  const minutes = Math.round(seconds / 60)
  if (Math.abs(minutes) < 60) return relativeFormatter.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (Math.abs(hours) < 24) return relativeFormatter.format(hours, 'hour')
  const days = Math.round(hours / 24)
  if (Math.abs(days) < 30) return relativeFormatter.format(days, 'day')
  const months = Math.round(days / 30)
  if (Math.abs(months) < 12) return relativeFormatter.format(months, 'month')
  return relativeFormatter.format(Math.round(days / 365), 'year')
}
