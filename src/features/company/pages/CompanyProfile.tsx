import { Building2, MapPin, Phone, Mail, FileText, Edit3, Save, X } from 'lucide-react'
import { useState } from 'react'

export function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: 'Mi Empresa S.A.',
    ruc: '20123456789',
    address: 'Av. Principal 123, Lima, Perú',
    phone: '+51 1 234-5678',
    email: 'contacto@miempresa.com',
    website: 'www.miempresa.com',
    description: 'Empresa líder en soluciones tecnológicas'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los datos
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mi Empresa</h1>
          <p className="text-slate-400">Gestiona la información de tu empresa</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* Company Info Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Building2 size={32} className="text-white" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={companyData.name}
                onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                className="text-xl font-bold bg-slate-700 text-white px-3 py-1 rounded border border-slate-600"
              />
            ) : (
              <h2 className="text-xl font-bold text-white">{companyData.name}</h2>
            )}
            <p className="text-slate-400">RUC: {companyData.ruc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-slate-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Dirección</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.address}
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                ) : (
                  <p className="text-white">{companyData.address}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-slate-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Teléfono</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                ) : (
                  <p className="text-white">{companyData.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-slate-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                ) : (
                  <p className="text-white">{companyData.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText size={18} className="text-slate-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Sitio Web</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                ) : (
                  <p className="text-white">{companyData.website}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
