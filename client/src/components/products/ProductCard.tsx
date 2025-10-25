import { useState } from "react"
import ProductModal from "./ProductModal"

interface ProductCardProps {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  unitPrice: string;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  description,
  image,
  unitPrice,
}: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <>
      <div 
        className="group bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-80"
        onClick={openModal}
      >
        
        {/* Imagen del producto */}
        <div className="relative h-48 bg-secondary-100 overflow-hidden shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl">🥜</div>
            </div>
          )}
        </div>

        {/* info producto */}
        <div className="p-4 flex flex-col h-32">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2 h-10 md:text-lg lg:text-lg xl:text-lg">
            {name}
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-0 mt-auto">
            <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-0">
              <span className="font-bold text-primary text-lg">
                ${price.toLocaleString()}
              </span>
              <span className="text-secondary-500/80 text-sm sm:text-md font-semibold">
                x {unitPrice === "gr" ? `100 ${unitPrice}` : unitPrice}
              </span>
            </div>
            
            <button 
              className="bg-primary hover:bg-primary-600 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200 hover:shadow-md w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation()
                openModal()
              }}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id || ''}
        name={name}
        description={description}
        price={price}
        image={image}
        unitPrice={unitPrice}
      />
    </>
  )
}

export default ProductCard
