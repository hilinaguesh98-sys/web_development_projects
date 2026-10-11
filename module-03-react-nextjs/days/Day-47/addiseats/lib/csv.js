function safeCell(value) {
  if (value === null || value === undefined) return ''
  let text = value instanceof Date ? value.toISOString() : String(value)
  if (/^[\s]*[=+@]/.test(text) || /^[\s]*-[^0-9]/.test(text)) text = `'${text}`
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows, columns) {
  const normalizedColumns = columns || (rows[0] ? Object.keys(rows[0]).map((key) => ({ key, label: key })) : [])
  const header = normalizedColumns.map((column) => safeCell(column.label)).join(',')
  const body = rows.map((row) => normalizedColumns.map((column) => safeCell(row[column.key])).join(','))
  return [header, ...body].join('\r\n')
}

export function downloadCsv(filename, rows, columns) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const blob = new Blob(['\uFEFF', toCsv(rows, columns)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
