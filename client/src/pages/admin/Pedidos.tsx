import { Autorenew, HourglassTop, LocalShipping, MoveToInbox } from "@mui/icons-material";
import OrderFilters from "../../components/orders/OrderFilter";
import OrderTable from "../../components/orders/OrderTable";
import StatsCard from "../../components/orders/StatsCard";
import { useEffect, useState, useCallback } from "react";
import { getOrders, getAllOrdersForStats } from "../../api/orders/handle-order";
import { PaginationControls } from "../../components/Pagination";
import { useNotificationContext } from "../../context/NotificationContext";

export type OrderStatus = 'pendiente' | 'proceso' | 'entregado' | 'cancelado'

export interface IUser {
  _id: string,
  name: string,
  lastName: string,
  email: string,
  address: string,
  phoneNumber: string
}

export interface IProduct {
  productId: {
    _id: string,
    name: string,
    price: number,
  },
  name: string,
  quantity: number,
  price: number,
  imgUrl: string
}

export interface IOrder {
  _id: string;
  totalAmount: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  comment?: string;
  userId: IUser;
  products: IProduct[];
}

interface IOrderResponse {
    orders: IOrder[],
    page: number,
    totalPages: number,
}

const Pedidos = () => {
  const [orders, setOrders] = useState<IOrderResponse>({ orders: [], page: 1, totalPages: 1 })
  const [allOrders, setAllOrders] = useState<IOrder[]>([])
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const { setRefreshCallback } = useNotificationContext()

  const fetchOrders = async (status?: string, page: number = 1) => {
    setLoading(true)
    try {
      const data = await getOrders(status || undefined, page)
      if (data) {
        setOrders(data)
      }
    } catch (error) {
      console.error('Error al traer los pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllOrdersForStats = async () => {
    try {
      const data = await getAllOrdersForStats()
      if (data) {
        setAllOrders(data)
      }
    } catch (error) {
      console.error('Error al traer todos los pedidos para estadísticas:', error)
    }
  }

  const refreshAllData = useCallback(() => {
    fetchOrders(selectedStatus || undefined, currentPage)
    fetchAllOrdersForStats()
  }, [selectedStatus, currentPage])

  useEffect(() => {
    fetchOrders(undefined, 1)
    fetchAllOrdersForStats()
  }, []) 


  useEffect(() => {
    setRefreshCallback(refreshAllData)
  }, [setRefreshCallback, refreshAllData])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedStatus])

  useEffect(() => {
    fetchOrders(selectedStatus || undefined, currentPage)
  }, [currentPage, selectedStatus])

  const handlePageChange = (_: unknown, page: number) => {
    setCurrentPage(page)
  }

  const handleOrderUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      orders: prevOrders.orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order)
    }))
    setAllOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status: newStatus } : order))
  }

  const handleStatusChange = (status: OrderStatus | '') => {
    setSelectedStatus(status)
  }

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(order => order.status === 'pendiente').length;
  const processingOrders = allOrders.filter(order => order.status === 'proceso').length;
  const shippedOrders = allOrders.filter(order => order.status === 'entregado').length;

  return (
    <main>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Pedidos
          </h1>
          <p className="mt-1 text-secondary-500/80">
            Administra los pedidos de los clientes
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Pedidos" 
          value={totalOrders} 
          icon={<MoveToInbox className="text-secondary-400" />} 
        />
        <StatsCard 
          title="Pendientes" 
          value={pendingOrders} 
          icon={<HourglassTop className="text-amber-600" />} 
        />
        <StatsCard 
          title="En Proceso" 
          value={processingOrders} 
          icon={<Autorenew className="text-blue-600" />} 
        />
        <StatsCard 
          title="Entregados" 
          value={shippedOrders} 
          icon={<LocalShipping className="text-green-600" />} 
        />
      </div>

      <OrderFilters 
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <OrderTable orders={orders.orders} onOrderUpdate={handleOrderUpdate} />
      )}

      <div className="flex justify-center mt-4">
        <PaginationControls
          currentPage={orders.page}
          totalPages={orders.totalPages}
          onPageChange={handlePageChange}
        />
      </div>


    </main>
  )
}

export default Pedidos