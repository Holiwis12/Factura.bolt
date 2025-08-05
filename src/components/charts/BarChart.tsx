import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: Array<{
    name: string
    value: number
    revenue?: number
  }>
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '8px'
          }}
          labelStyle={{ color: '#E5E7EB' }}
        />
        <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
        {data[0]?.revenue !== undefined && (
          <Bar dataKey="revenue" fill="#EC4899" radius={[8, 8, 0, 0]} />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
