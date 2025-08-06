import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

const COLORS = ['#38bdf8', '#60a5fa', '#0ea5e9', '#0284c7', '#0369a1']

export function LineChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
        <XAxis dataKey="name" stroke="#A3A3A3" />
        <YAxis stroke="#A3A3A3" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#262626', 
            borderColor: '#2F2F2F',
            borderRadius: '0.5rem'
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#38bdf8" 
          activeDot={{ r: 6 }} 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function BarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
        <XAxis dataKey="name" stroke="#A3A3A3" />
        <YAxis stroke="#A3A3A3" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#262626', 
            borderColor: '#2F2F2F',
            borderRadius: '0.5rem'
          }} 
        />
        <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PieChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#262626', 
            borderColor: '#2F2F2F',
            borderRadius: '0.5rem'
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
