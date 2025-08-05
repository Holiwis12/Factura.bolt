import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
}

export function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change.startsWith('+')
  const Icon = isPositive ? TrendingUp : TrendingDown
  
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
          isPositive 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          <Icon size={16} />
          <span>{change}</span>
        </div>
      </div>
      <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 group-hover:w-full ${
            isPositive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'
          }`}
          style={{ width: '60%' }}
        />
      </div>
    </div>
  )
}
