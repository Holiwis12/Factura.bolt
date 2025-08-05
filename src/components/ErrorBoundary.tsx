import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'Ha ocurrido un error inesperado';
  let errorDetails = '';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = 'Página no encontrada';
      errorDetails = 'La página que buscas no existe o ha sido movida';
    } else {
      errorMessage = error.statusText;
      errorDetails = error.data?.message || '';
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="max-w-md w-full p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {errorMessage}
          </h2>
          {errorDetails && (
            <p className="text-slate-300 mb-4">{errorDetails}</p>
          )}
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Volver atrás
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
