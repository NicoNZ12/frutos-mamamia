interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  image?: string;
  unitPrice: string;
  quantityStep: number
}

const ProductCard = ({ 
  name, 
  price, 
  image,
  unitPrice,
  quantityStep 
}: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-4xl">🥜</div>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
                
        {/* Precios */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary text-lg">
              ${price.toLocaleString()}
            </span>
          </div>
          
          {/* Botón agregar al carrito */}
          <button className="bg-primary hover:bg-primary-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 hover:shadow-md">
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
