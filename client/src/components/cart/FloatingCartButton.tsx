import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router'

const FloatingCartButton = () => {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  if (itemCount === 0) return null

  return (
    <Link 
      to="/pedidos"
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 md:hidden"
    >
      <div className="relative">
        <ShoppingCartIcon className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 bg-primary-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-5">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      </div>
    </Link>
  )
}

export default FloatingCartButton