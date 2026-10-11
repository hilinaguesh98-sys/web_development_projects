'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const money = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

function MoneyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><strong>{label}</strong><p>{money.format(Number(payload[0].value || 0))}</p></div>
}

function CountTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><strong>{label}</strong><p>{Number(payload[0].value || 0)} orders</p></div>
}

export default function DashboardCharts({ revenueData, dailyData }) {
  return <div className="dashboard-charts">
    <section className="dashboard-chart-panel">
      <div className="chart-heading"><div><h2>Revenue by neighbourhood</h2><p>Sum of order totals, including delivery fees.</p></div><span>ETB</span></div>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 12, right: 16, left: 12, bottom: 45 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="neighborhood" angle={-25} textAnchor="end" interval={0} height={65} tick={{ fontSize: 12 }} />
            <YAxis width={100} domain={[0, 'auto']} tickFormatter={(value) => money.format(Number(value))} />
            <Tooltip content={<MoneyTooltip />} />
            <Bar dataKey="revenue" name="Revenue" fill="#f47d16" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-table-wrap">
        <table className="chart-data-table">
          <caption>Revenue by neighbourhood data</caption>
          <thead><tr><th scope="col">Neighbourhood</th><th scope="col">Revenue (ETB)</th></tr></thead>
          <tbody>{revenueData.map((row) => <tr key={row.neighborhood}><th scope="row">{row.neighborhood}</th><td>{money.format(row.revenue)}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <section className="dashboard-chart-panel">
      <div className="chart-heading"><div><h2>Orders over time</h2><p>Number of orders placed each day during the last 14 days.</p></div><span>Orders / day</span></div>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData} margin={{ top: 12, right: 16, left: 0, bottom: 18 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} minTickGap={14} />
            <YAxis allowDecimals={false} domain={[0, 'auto']} width={38} />
            <Tooltip content={<CountTooltip />} />
            <Line type="monotone" dataKey="orders" name="Orders" stroke="#f47d16" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-table-wrap">
        <table className="chart-data-table">
          <caption>Daily orders data for the last 14 days</caption>
          <thead><tr><th scope="col">Date</th><th scope="col">Orders</th></tr></thead>
          <tbody>{dailyData.map((row) => <tr key={row.date}><th scope="row">{row.label}</th><td>{row.orders}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  </div>
}
