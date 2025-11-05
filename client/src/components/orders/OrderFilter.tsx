import React from "react";
import type { OrderStatus } from "../../pages/admin/Pedidos";

interface IOrderFiltersProps {
  selectedStatus: OrderStatus | '';
  onStatusChange: (status: OrderStatus | '') => void;
}

const OrderFilters = ({ selectedStatus, onStatusChange }: IOrderFiltersProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as OrderStatus | '');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-secondary-200 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="w-full md:w-auto">
        <select 
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full md:w-auto border border-secondary-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="proceso">En Proceso</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
    </div>
  )
}

export default OrderFilters