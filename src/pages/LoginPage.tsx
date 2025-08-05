import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 backdrop-blur-xl bg-slate-900/60 p-8 rounded-3xl shadow-2xl border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            FacturaPro
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Tu negocio, simplificado.
          </p>
        </div>
        
        <LoginForm />

        <div className="mt-4 text-center">
          <button className="w-full py-2 px-4 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">
            Entrar como Demo
          </button>
          
          <p className="mt-4 text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
