import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import BlockIcon from '@mui/icons-material/Block';

const Unauthorized = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl mb-6">
            <BlockIcon className="mx-auto text-red-500" fontSize="inherit" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a esta página. 
            {!isAuthenticated && ' Por favor, inicia sesión primero.'}
            {isAuthenticated && ' Contacta al administrador si crees que esto es un error.'}
          </p>
          <div className="space-y-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors block"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <Link
                to="/"
                className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors block"
              >
                Ir al Inicio
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized