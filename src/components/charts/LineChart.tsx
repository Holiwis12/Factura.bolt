import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface LineChartProps {
  data: Array<{
    name: string
    value: number
    revenue?: number
  }>
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
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
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8B5CF6" 
          strokeWidth={3}
          dot={{ fill: '#8B5CF6', r: 6 }}
          activeDot={{ r: 8 }}
        />
        {data[0]?.revenue !== undefined && (
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#EC4899" 
            strokeWidth={3}
            dot={{ fill: '#EC4899', r: 6 }}
            activeDot={{ r: 8 }}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
