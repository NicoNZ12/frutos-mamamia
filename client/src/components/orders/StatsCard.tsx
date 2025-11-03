interface IStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
}

const StatsCard = ({ title, value, icon }: IStatsCardProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-secondary-500/80">{title}</span>
        {icon}
      </div>
      <span className="text-3xl font-bold text-secondary-800 mt-2">{value}</span>
    </div>
  )
}

export default StatsCard