import { Navigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { decodeJWT } from '../../utils/decode-jwt'

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth()

  // Si ya está autenticado, redirigir según el tipo de usuario
  if (isAuthenticated) {
    const decodedToken = decodeJWT()
    
    if (decodedToken?.isAdmin) {
      return <Navigate to="/admin" replace />
    } else {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

export default PublicRoute