import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { decodeJWT } from '../../utils/decode-jwt'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin) {
    const decodedToken = decodeJWT()
    
    if (!decodedToken || !decodedToken.isAdmin) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute