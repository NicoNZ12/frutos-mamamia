
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { ArrowBack, Person, Email, Phone, Home, CreditCard, Message, CalendarToday } from '@mui/icons-material'
import StatusSelector from '../../components/orders/StatusSelector'
import type { IOrder, OrderStatus } from './Pedidos'
import { getOrderById, updateOrderStatus } from '../../api/orders/handle-order'
import toast from 'react-hot-toast'

const PedidoDetalle = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<IOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return
      
      try {
        const orderData = await getOrderById(id)
        if (orderData) {
          setOrder(orderData)
        }
      } catch (error) {
        toast.error('Error al cargar el pedido')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order || !id) return
    
    setUpdatingStatus(true)
    try {
      await updateOrderStatus(id, newStatus)
      setOrder({
        ...order,
        status: newStatus
      })
      toast.success('Estado del pedido actualizado correctamente')
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Error al actualizar el estado del pedido')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-500/80">Cargando detalle del pedido...</p>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-500/80 mb-4">Pedido no encontrado</h2>
        <p className="text-secondary-500/80 mb-6">No se pudo encontrar el pedido con ID: {id}</p>
        <button
          onClick={() => navigate('/admin/pedidos')}
          className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Volver a Pedidos
        </button>
      </main>
    )
  }

  return (
    <main className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/pedidos')}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowBack className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500/80">
              Pedido {order._id}
            </h1>
            <p className="text-secondary-500/80 text-sm sm:text-base">
              Detalles del pedido
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <StatusSelector 
            status={order.status} 
            onStatusChange={handleStatusChange}
            disabled={updatingStatus}
          />
          <span className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
            <CalendarToday className="w-4 h-4" />
            {formatDate(order.date)} - {formatTime(order.date)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info del cliente */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-secondary-500/80 mb-4">Información del Cliente</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Person className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-500">Nombre</p>
                  <p className="text-secondary-500">{order.userId.name} {order.userId.lastName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Email className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-500">Email</p>
                  <p className="text-secondary-500/80">{order.userId.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-500">Teléfono</p>
                  <p className="text-secondary-500/80">{order.userId.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-500">Dirección</p>
                  <p className="text-secondary-500/80">{order.userId.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-500">Método de Pago</p>
                  <p className="text-secondary-500/80">{order.paymentMethod}</p>
                </div>
              </div>

              {order.comment && (
                <div className="flex items-start gap-3">
                  <Message className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-secondary-500">Comentarios</p>
                    <p className="text-secondary-500/80">{order.comment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-secondary-500/80 mb-4">Productos del Pedido</h2>
            
            <div className="space-y-4">
              {order.products.map((product, index) => (
                <div key={`${product.productId._id}-${index}`} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden shrink-0">
                    {product.imgUrl ? (
                      <img 
                        src={product.imgUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-2xl">🥜</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-secondary-500 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${product.price.toLocaleString()} x 100gr
                    </p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-secondary-500/80">
                      ${(product.price * product.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-secondary-500/80">Total del Pedido:</span>
                <span className="text-xl font-bold text-primary">${order.totalAmount.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {order.products.length} producto{order.products.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PedidoDetalle