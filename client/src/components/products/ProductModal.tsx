import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../context/CartContext'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  id: string
  name: string
  description?: string
  price: number
  image?: string
  unitPrice: string
}

const ProductModal = ({
  isOpen,
  onClose,
  id,
  name,
  description,
  price,
  image,
  unitPrice
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(
      {
        id,
        name,
        price,
        unitPrice,
        image
      },
      quantity
    )
    onClose()
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrement = () => {
    if(quantity > 1){
      setQuantity(prev => prev - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if(value > 0) {
      setQuantity(value)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-secondary-500 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

        <div className="relative p-6 border-b">
          <div
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-secondary-500/80 hover:text-primary hover:bg-gray-1000 rounded-full hover:bg-gray-200 transition-colors"
          >
            <CloseIcon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-primary pr-8">
            {name}
          </h2>
        </div>


        <div className="p-6">

          <div className="relative h-64 bg-secondary-100 rounded-lg overflow-hidden mb-6">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl">🥜</div>
              </div>
            )}
          </div>

          {description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-secondary-500/80 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          )}


          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-primary text-2xl">
                ${price.toLocaleString()}
              </span>
              <span className="text-secondary-500/80 text-lg">
                x {unitPrice === "gr" ? `100 ${unitPrice}` : unitPrice}
              </span>
            </div>
            

            <div className="text-sm text-secondary-500/80">
              Total: <span className="font-semibold text-primary text-lg">${(price * quantity).toLocaleString()}</span>
            </div>
          </div>

          {/* Selector de cantidad */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-l-lg transition-colors cursor-pointer"
                >
                  −
                </button>
                <input
                  type="number"
                  disabled
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 h-10 text-center text-sm border-0 bg-transparent focus:ring-0 focus:outline-none"
                />
                <button
                  onClick={handleIncrement}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-r-lg transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
                <span className="px-3 text-sm text-secondary-500/80">
                    {unitPrice === "gr" ? `${quantity * 100} ${unitPrice}` : `${quantity} ${unitPrice}` }
                </span>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 hover:shadow-md cursor-pointer">
            Agregar al carrito - ${(price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
