import { useState } from "react"
import { useCart } from "../context/CartContext"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

interface OrderForm {
  address: string
  phoneNumber: string
  paymentMethod: "efectivo" | "transferencia"
  comment: string
}

const Orders = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()

    const navigate = useNavigate()

  const [form, setForm] = useState<OrderForm>({
    address: "",
    phoneNumber: "",
    paymentMethod: "efectivo",
    comment: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmitOrder = (e: React.FormEvent) => {
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
        products: items.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        address: form.address,
        phoneNumber: form.phoneNumber,
        paymentMethod: form.paymentMethod,
        comment: form.comment || undefined
      }

      console.log(orderData)
            
      clearCart()
      setForm({
        address: "",
        phoneNumber: "",
        paymentMethod: "efectivo",
        comment: ""
      })
      

      toast.success("¡Pedido realizado con éxito! Gracias por comprar en Mamamia.")
      navigate("/productos")


    } catch (error) {
      toast.error("Error al procesar el pedido. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-secondary-500/80 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-secondary-500/80 mb-6">
            Agrega algunos productos para realizar tu pedido
          </p>
          <a
            href="/productos"
            className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ver productos
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Mi Pedido</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Detalle del carrito */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-secondary-500/80 mb-4">
            Productos seleccionados
          </h2>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden shrink-0">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-2xl">🥜</div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-secondary-500/80 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toLocaleString()} x {item.unitPrice === "gr" ? `100 ${item.unitPrice}` : item.unitPrice}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    Subtotal: ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <RemoveIcon className="w-4 h-4" />
                  </button>
                  
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <AddIcon className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors ml-2"
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-primary">
              <span>Total:</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Formulario */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-secondary-500/80 mb-4">
            Datos de entrega
          </h2>
          
          <form onSubmit={handleSubmitOrder} className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-secondary-400"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-secondary-400"
                placeholder="Ej: +54 9 11 1234-5678"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none placeholder:text-secondary-400"
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
              className="w-full bg-primary hover:bg-primary-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors duration-200 hover:shadow-md"
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