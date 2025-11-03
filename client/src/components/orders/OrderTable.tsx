import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import type { IOrder, OrderStatus } from "../../pages/admin/Pedidos"
import StatusSelector from "./StatusSelector";
import { updateOrderStatus } from "../../api/orders/handle-order";
import toast from "react-hot-toast";

interface IOrderTableProps {
  orders: IOrder[];
  onOrderUpdate: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderTable = ({ orders, onOrderUpdate }: IOrderTableProps) => {
  const navigate = useNavigate()

  const handleViewDetails = (orderId: string) => {
    navigate(`/admin/pedidos/${orderId}`)
  }

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      onOrderUpdate(orderId, newStatus)
      toast.success('Estado del pedido actualizado correctamente')
    } catch (error) {
      toast.error('Error al actualizar el estado del pedido')
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-h-[294px] overflow-auto sm:max-h-[360px] 2xl:max-h-[600px]">
      
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full min-w-[800px]">

          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Productos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-secondary-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-secondary-100 transition-colors">
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">{order.userId.name} {order.userId.lastName}</div>
                  <div className="text-xs text-gray-500">{order.userId.email}</div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{order.products.length} producto{order.products.length > 1 ? 's' : ''}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">${order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <StatusSelector
                    status={order.status}
                    onStatusChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{formatDate(order.date)}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(order._id)}
                    className="text-gray-500 hover:text-blue-600 cursor-pointer" 
                    title="Ver detalles"
                  >
                    <Visibility />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    {/* tabla diseño mobile  */}
      <div className="block md:hidden divide-y divide-secondary-100">
        {orders.map((order) => (
          <div key={order._id} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{order._id}</span>
              <span className="font-medium text-gray-800">${order.totalAmount.toFixed(2)}</span>
            </div>

            <div className="mb-3">
              <div className="text-sm font-medium text-gray-800">{order.userId.name} {order.userId.lastName}</div>
              <div className="text-xs text-gray-500">{order.userId.email}</div>
            </div>

            <div className="flex justify-between items-center">
              <StatusSelector
                status={order.status}
                onStatusChange={(newStatus) => handleStatusChange(order._id, newStatus)}
              />
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                <button 
                  onClick={() => handleViewDetails(order._id)}
                  className="text-gray-500 hover:text-blue-600 cursor-pointer" 
                  title="Ver detalles"
                >
                  <Visibility/>
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default OrderTable;