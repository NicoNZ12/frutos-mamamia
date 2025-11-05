import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { handleOrder } from "../api/orders/handle-order"
import { decodeJWT } from "../utils/decode-jwt"
import { fetchUser } from "../api/users/fetchUser"
import { handleSuccessOrderAlert } from "../utils/handle-alert"

interface OrderForm {
  address: string
  phoneNumber: string
  paymentMethod: "efectivo" | "transferencia"
  comment: string
}

const Orders = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()

  const navigate = useNavigate()

  const decodedToken = decodeJWT()

  const [form, setForm] = useState<OrderForm>({
    address: "",
    phoneNumber: "",
    paymentMethod: "efectivo",
    comment: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      if (!decodedToken) return
      
      const user = await fetchUser(decodedToken.id)

      if(user.error){
        toast.error("Error al obtener los datos del usuario")
        return
      }
      
      setForm(prev => ({
        ...prev,
        address: user.address || "",
        phoneNumber: user.phoneNumber || ""
      }))
    }

    getUserData()
    
  }, [])
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  if (!decodedToken) {
    return null
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      toast.error("El carrito está vacío")
      return
    }

    if (!form.address.trim() || !form.phoneNumber.trim()) {
      toast.error("Por favor completa todos los campos obligatorios")
      return
    }

    setIsSubmitting(true)
    
    try {
      const orderData = {
        userId: decodedToken?.id,
        products: items.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imgUrl: item.image
        })),
        address: form.address,
        phoneNumber: form.phoneNumber,
        paymentMethod: form.paymentMethod,
        comment: form.comment || ""
      }

      console.log(orderData)
      const response = await handleOrder(orderData)

      if(!response.success){
        toast.error("Error al procesar el pedido. Intenta nuevamente.")
        return
      }
            
      clearCart()
      setForm({
        address: "",
        phoneNumber: "",
        paymentMethod: "efectivo",
        comment: ""
      })
      

      handleSuccessOrderAlert()
      setTimeout(() => {
        navigate("/productos")
      }, 4000)


    } catch (error) {
      toast.error("Error al procesar el pedido. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl sm:text-6xl mb-4">🛒</div>
          <h2 className="text-xl sm:text-2xl font-bold text-secondary-500/80 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-sm sm:text-base text-secondary-500/80 mb-6">
            Agrega algunos productos para realizar tu pedido
          </p>
          <a
            href="/productos"
            className="bg-primary hover:bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            Ver productos
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Mi Pedido</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Detalle del carrito */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 order-2 lg:order-1">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary-500/80 mb-4">
            Productos seleccionados
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-100 rounded-lg overflow-hidden shrink-0">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-lg sm:text-2xl">🥜</div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-secondary-500/80 truncate text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    ${item.price.toLocaleString()} x {item.unitPrice === "gr" ? `100 ${item.unitPrice}` : item.unitPrice}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-primary">
                    Subtotal: ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <RemoveIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    
                    <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <AddIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-4 sm:mt-6 pt-4">
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-primary">
              <span>Total:</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Formulario */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 order-1 lg:order-2">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary-500/80 mb-4">
            Datos de entrega
          </h2>
          
          <form onSubmit={handleSubmitOrder} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-secondary-500/80 mb-1">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-secondary-400 text-sm sm:text-base"
                placeholder="Ingresa tu dirección completa"
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-secondary-500/80 mb-1">
                Número de teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-secondary-400 text-sm sm:text-base"
                placeholder="Ej: 2604123456"
              />
            </div>
            
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-secondary-500/80 mb-1">
                Método de pago <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-secondary-500/80 mb-1">
                Comentarios (opcional)
              </label>
              <textarea
                id="comment"
                name="comment"
                value={form.comment}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none placeholder:text-secondary-400 text-sm sm:text-base"
                placeholder="Agrega cualquier comentario adicional sobre tu pedido..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.comment.length}/500 caracteres
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-600 disabled:bg-gray-400 text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors duration-200 hover:shadow-md text-sm sm:text-base cursor-pointer"
            >
              {isSubmitting ? "Procesando pedido..." : `Confirmar pedido - $${getTotalPrice().toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Orders