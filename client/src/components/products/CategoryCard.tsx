
interface CategoryCardProps {
  categoryName?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ 
  categoryName,  
  isSelected = false,
  onClick 
}: CategoryCardProps) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`rounded-xl border transition-all duration-200 p-4 flex flex-col items-center justify-center min-h-[100px] ${
        isSelected 
          ? 'bg-primary border-primary shadow-md' 
          : 'bg-primary-100 border-primary-200 hover:border-primary hover:shadow-sm'
      }`}>
                
        <h3 className={`text-md font-medium text-center leading-tight transition-colors duration-200 ${
          isSelected 
            ? 'text-white' 
            : 'text-primary-700 group-hover:text-primary'
        }`}>
          {categoryName}
        </h3>
      </div>
    </div>
  )
}

export default CategoryCard