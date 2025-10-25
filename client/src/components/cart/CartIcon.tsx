import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router'

const CartIcon = () => {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <Link 
      to="/pedidos" 
      className="relative p-2 text-secondary-500/80 hover:text-primary transition-colors"
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-5">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon