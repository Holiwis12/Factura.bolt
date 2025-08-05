import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate('/');
  };

  return (
    <div className="w-full max-w-md p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Iniciar Sesión
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Usuario / Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="adminpro"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="@Teamo1110a"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="text-center mb-4">
          <p className="text-slate-400 text-sm mb-3">🔑 <strong>Credenciales disponibles:</strong></p>
          <div className="bg-slate-700/30 rounded-lg p-4 text-sm space-y-2">
            <div className="border-b border-slate-600 pb-2">
              <p className="text-purple-300 font-medium">👑 Software Owner:</p>
              <p className="text-slate-300"><strong>Usuario:</strong> adminpro</p>
              <p className="text-slate-300"><strong>Password:</strong> @Teamo1110a</p>
            </div>
            <div className="border-b border-slate-600 pb-2">
              <p className="text-blue-300 font-medium">🏢 Empresa:</p>
              <p className="text-slate-300"><strong>Email:</strong> empresa@test.com</p>
              <p className="text-slate-300"><strong>Password:</strong> empresa123</p>
            </div>
            <div>
              <p className="text-green-300 font-medium">👤 Empleado:</p>
              <p className="text-slate-300"><strong>Email:</strong> empleado@test.com</p>
              <p className="text-slate-300"><strong>Password:</strong> empleado123</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDemoLogin}
          className="w-full py-2 px-4 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
        >
          🚀 Acceso Rápido Demo
        </button>
      </div>
    </div>
  );
}
