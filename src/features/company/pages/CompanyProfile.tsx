import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { Building2, MapPin, Phone, Mail, Globe, Calendar, Edit, Save, X } from 'lucide-react'

type CompanyInfo = {
  name: string
  rnc: string
  address: string
  city: string
  phone: string
  email: string
  website: string
  founded: string
  employees: number
  industry: string
  description: string
}

const initialCompanyData: CompanyInfo = {
  name: 'Empresa Demo S.A.C.',
  rnc: '123456789',
  address: 'Av. Winston Churchill 1234, Piantini',
  city: 'Santo Domingo, República Dominicana',
  phone: '809-555-0123',
  email: 'info@empresademo.com',
  website: 'www.empresademo.com',
  founded: '2020-01-15',
  employees: 25,
  industry: 'Tecnología y Servicios',
  description: 'Empresa líder en soluciones tecnológicas y servicios especializados para el mercado dominicano.'
}

export function CompanyProfile() {
  const [companyData, setCompanyData] = useState<CompanyInfo>(initialCompanyData)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<CompanyInfo>(initialCompanyData)

  const handleEdit = () => {
    setEditData(companyData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setCompanyData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(companyData)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof CompanyInfo, value: string | number) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Mi Empresa</h1>
            <p className="opacity-90">Información y configuración de la empresa</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
              >
                <Edit size={20} />
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save size={20} />
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <X size={20} />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Logo and Basic Info */}
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 size={40} className="text-white" />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-xl font-bold text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full text-center mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-white mb-2">{companyData.name}</h2>
            )}
            <p className="text-slate-400 mb-4">RNC: {companyData.rnc}</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar size={16} />
                <span>Fundada: {new Date(companyData.founded).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Building2 size={16} />
                <span>{companyData.employees} empleados</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Dirección</p>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="text-white">{companyData.address}</p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full mt-2"
                  />
                ) : (
                  <p className="text-slate-300 text-sm mt-1">{companyData.city}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-green-400" />
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Teléfono</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full mt-1"
                  />
                ) : (
                  <p className="text-white">{companyData.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-purple-400" />
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full mt-1"
                  />
                ) : (
                  <p className="text-white">{companyData.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={20} className="text-cyan-400" />
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Sitio Web</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full mt-1"
                  />
                ) : (
                  <p className="text-white">{companyData.website}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Business Information */}
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Información del Negocio</h3>
          <div className="space-y-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">Industria</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full"
                />
              ) : (
                <p className="text-white">{companyData.industry}</p>
              )}
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">Número de Empleados</p>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.employees}
                  onChange={(e) => handleInputChange('employees', parseInt(e.target.value))}
                  className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full"
                />
              ) : (
                <p className="text-white">{companyData.employees}</p>
              )}
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">Descripción</p>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="text-white bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 w-full"
                  rows={4}
                />
              ) : (
                <p className="text-white">{companyData.description}</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Años en Operación</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {new Date().getFullYear() - new Date(companyData.founded).getFullYear()}
          </p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Clientes Activos</h3>
          <p className="mt-2 text-2xl font-bold text-white">243</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Productos en Catálogo</h3>
          <p className="mt-2 text-2xl font-bold text-white">156</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Facturas Emitidas</h3>
          <p className="mt-2 text-2xl font-bold text-white">1,247</p>
        </Card>
      </div>
    </div>
  )
}
