type MetricCardProps = {
  title: string
  value: string
  change: string
}

export function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className={`mt-2 text-sm ${
        isPositive ? 'text-green-400' : 'text-red-400'
      }`}>
        {change}
      </p>
    </div>
  )
}
