import { useState } from 'react'
import { useAuth } from '../AuthProvider'
import { useNotifications } from '../../notifications/context/NotificationsContext'
import { Building2, User, Lock, Eye, EyeOff } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginAsDemo } = useAuth()
  const { addNotification } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        addNotification({
          type: 'success',
          title: 'Inicio de sesión exitoso',
          message: 'Bienvenido al sistema'
        })
      } else {
        addNotification({
          type: 'error',
          title: 'Error de autenticación',
          message: 'Credenciales incorrectas'
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error del sistema',
        message: 'Ha ocurrido un error inesperado'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoAccess = async () => {
    setIsLoading(true)
    try {
      const success = await loginAsDemo()
      if (success) {
        addNotification({
          type: 'success',
          title: 'Acceso demo activado',
          message: 'Bienvenido María González - Empresa Demo S.A.C.'
        })
      } else {
        addNotification({
          type: 'error',
          title: 'Error en demo',
          message: 'No se pudo acceder al modo demo'
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error en demo',
        message: 'No se pudo acceder al modo demo'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Sistema de Facturación
          </h1>
          <p className="text-slate-300">
            Accede a tu panel de control
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Field - ARREGLADO */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Usuario o Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="adminpro o tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Credentials Info */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-slate-300 mb-3">🔑 Credenciales de prueba:</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-purple-300">👑 Software Owner:</span>
                  <span className="text-slate-300">adminpro / @Teamo1110a</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">🏢 Empresa:</span>
                  <span className="text-slate-300">empresa@test.com / empresa123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">👤 Empleado:</span>
                  <span className="text-slate-300">empleado@test.com / empleado123</span>
                </div>
              </div>
            </div>

            {/* Demo Access */}
            <button
              onClick={handleDemoAccess}
              disabled={isLoading}
              className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Accediendo...
                </div>
              ) : (
                '🚀 Acceso Demo Rápido'
              )}
            </button>
            <p className="text-xs text-slate-400 text-center mt-2">
              Prueba el sistema sin registrarte
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
