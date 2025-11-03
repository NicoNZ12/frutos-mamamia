import { Autorenew, HourglassTop, LocalShipping, MoveToInbox } from "@mui/icons-material";
import OrderFilters from "../../components/orders/OrderFilter";
import OrderTable from "../../components/orders/OrderTable";
import StatsCard from "../../components/orders/StatsCard";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders/handle-order";

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

const Pedidos = () => {
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders()
      if(data){
        setOrders(data)
      }
    }
    fetchOrders()
  }, [])

  const handleOrderUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status: newStatus } : order))
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pendiente').length;
  const processingOrders = orders.filter(order => order.status === 'proceso').length;
  const shippedOrders = orders.filter(order => order.status === 'entregado').length;

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
          title="Enviados" 
          value={shippedOrders} 
          icon={<LocalShipping className="text-green-600" />} 
        />
      </div>

      <OrderFilters />

      <OrderTable orders={orders} onOrderUpdate={handleOrderUpdate} />


    </main>
  )
}

export default Pedidos