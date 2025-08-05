import { Card } from '../../../components/ui/card'

export function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="opacity-90">Personaliza tu cuenta y preferencias</p>
      </div>

      {/* Company Settings */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Información de la Empresa</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              defaultValue="Mi Empresa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              RNC
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              defaultValue="123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Dirección
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              rows={3}
              defaultValue="Calle Principal #123, Santo Domingo"
            />
          </div>
        </div>
      </Card>

      {/* Invoice Settings */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Configuración de Facturación</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Prefijo de Factura
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              defaultValue="INV-"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Moneda
            </label>
            <select className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
              <option value="DOP">Peso Dominicano (DOP)</option>
              <option value="USD">Dólar Estadounidense (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="tax" className="rounded bg-slate-800 border-slate-700" />
            <label htmlFor="tax" className="text-sm font-medium text-slate-400">
              Incluir ITBIS en facturas
            </label>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Notificaciones</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Notificaciones por Email</h3>
              <p className="text-sm text-slate-400">Recibe actualizaciones importantes por correo</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Alertas de Inventario</h3>
              <p className="text-sm text-slate-400">Notificaciones de stock bajo</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Guardar Cambios
        </button>
      </div>
    </div>
  )
}
