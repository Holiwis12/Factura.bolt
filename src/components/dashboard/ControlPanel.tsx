import { Button } from '../ui/button'
import { 
  FileText, 
  Search, 
  ShoppingCart, 
  Calculator,
  BarChart2,
  Users,
  Settings,
  CreditCard
} from 'lucide-react'

const actions = [
  {
    title: "Facturación",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-blue-500/10 text-blue-500",
    hover: "hover:bg-blue-500/20"
  },
  {
    title: "Buscar Factura",
    icon: <Search className="h-5 w-5" />,
    color: "bg-purple-500/10 text-purple-500",
    hover: "hover:bg-purple-500/20"
  },
  {
    title: "Ventas POS",
    icon: <ShoppingCart className="h-5 w-5" />,
    color: "bg-emerald-500/10 text-emerald-500",
    hover: "hover:bg-emerald-500/20"
  },
  {
    title: "Calculadora",
    icon: <Calculator className="h-5 w-5" />,
    color: "bg-amber-500/10 text-amber-500",
    hover: "hover:bg-amber-500/20"
  },
  {
    title: "Reportes",
    icon: <BarChart2 className="h-5 w-5" />,
    color: "bg-cyan-500/10 text-cyan-500",
    hover: "hover:bg-cyan-500/20"
  },
  {
    title: "Clientes",
    icon: <Users className="h-5 w-5" />,
    color: "bg-violet-500/10 text-violet-500",
    hover: "hover:bg-violet-500/20"
  },
  {
    title: "Configuración",
    icon: <Settings className="h-5 w-5" />,
    color: "bg-gray-500/10 text-gray-500",
    hover: "hover:bg-gray-500/20"
  },
  {
    title: "Pagos",
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-rose-500/10 text-rose-500",
    hover: "hover:bg-rose-500/20"
  }
]

export function ControlPanel() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`h-24 flex-col gap-3 rounded-xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 ${action.color} ${action.hover} transition-all hover:shadow-lg hover:-translate-y-1`}
        >
          <div className="p-2 rounded-full bg-white/5 backdrop-blur-sm">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-white">{action.title}</span>
        </Button>
      ))}
    </div>
  )
}
