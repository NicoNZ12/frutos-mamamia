
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
      <div className={`rounded-xl border transition-all duration-200 p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-h-24 sm:min-h-28 md:min-h-32 ${
        isSelected 
          ? 'bg-primary border-primary shadow-md' 
          : 'bg-primary-100 border-primary-200 hover:border-primary hover:shadow-sm'
      }`}>
                
        <h3 className={`text-sm sm:text-base md:text-lg font-medium text-center leading-snug transition-colors duration-200 wrap-break-word hyphens-auto px-1 ${
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