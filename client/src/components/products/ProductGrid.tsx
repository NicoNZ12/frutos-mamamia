import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { fetchProducts } from "../../api/products/fetchProducts"

interface IProduct{
    _id: string,
    name: string,
    description?: string,
    price: number,
    imgUrl?: string
    unitPrice: string
    quantityStep: number
}

interface ProductGridProps {
    selectedCategory?: string
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const data = await fetchProducts(selectedCategory)
                setProducts(data.products || data)
            } catch (error) {
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [selectedCategory])

    if (loading) {
        return (
            <div className="w-full flex justify-center py-8">
                <div className="text-secondary-500/80">Cargando productos...</div>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="w-full flex justify-center py-8">
                <div className="text-gray-500">
                    {selectedCategory 
                        ? `No se encontraron productos en la categoría "${selectedCategory}"` 
                        : "No hay productos disponibles"
                    }
                </div>
            </div>
        )
    }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.imgUrl}
            unitPrice={product.unitPrice}
            quantityStep={product.quantityStep}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid