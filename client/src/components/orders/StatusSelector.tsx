import { Autorenew, Cancel, HourglassTop, KeyboardArrowDown, LocalShipping } from "@mui/icons-material"
import type { OrderStatus } from "../../pages/admin/Pedidos"


interface IStatusSelectorProps {
  status: OrderStatus
  onStatusChange?: (newStatus: OrderStatus) => void
  disabled?: boolean
}

const statusConfig = {
  pendiente: {
    icon: <HourglassTop sx={{fontSize: 16}} />,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    ringColor: 'focus:ring-yellow-500',
    label: 'Pendiente'
  },
  proceso: {
    icon: <Autorenew sx={{fontSize: 16}} />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    ringColor: 'focus:ring-blue-500',
    label: 'En Proceso'
  },
  entregado: {
    icon: <LocalShipping sx={{fontSize: 16}} />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    ringColor: 'focus:ring-green-500',
    label: 'Entregado'
  },
  cancelado: {
    icon: <Cancel sx={{fontSize: 16}} />,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    ringColor: 'focus:ring-orange-500',
    label: 'Cancelado'
  }
}

const StatusSelector = ({ status, onStatusChange, disabled = false }: IStatusSelectorProps) => {
  const config = statusConfig[status as keyof typeof statusConfig];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus
    if (onStatusChange) {
      onStatusChange(newStatus)
    }
  }

  if (!config) {
    return (
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        {status}
      </span>
    )
  }

  return (
    <div className="relative inline-flex items-center">

      <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 z-10 ${config.textColor}`}>
        {config.icon}
      </span>
      
      <select
        value={status}
        onChange={handleChange}
        disabled={disabled}
        className={`
          appearance-none cursor-pointer
          rounded-full border border-transparent
          py-1.5 pl-8 pr-8
          text-sm font-medium
          ${config.bgColor}
          ${config.textColor}
          ${config.ringColor}
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <option value="pendiente">Pendiente</option>
        <option value="proceso">En Proceso</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>

      <KeyboardArrowDown
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${config.textColor} pointer-events-none text-lg`}
      />
    </div>
  )
}

export default StatusSelector