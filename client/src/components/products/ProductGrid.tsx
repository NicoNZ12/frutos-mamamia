import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { fetchProducts } from "../../api/products/fetchProducts"
import { PaginationControls } from "../Pagination"

interface IProduct{
    _id: string,
    name: string,
    description?: string,
    price: number,
    imgUrl?: string,
    unitPrice: string
}

interface ProductGridProps {
    selectedCategory?: string
}

interface PaginationData {
    page: number
    totalPages: number
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        totalPages: 1,
    })
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const data = await fetchProducts(selectedCategory, currentPage, 15)
                setProducts(data.products || data)
                setPagination({
                    page: data.page || 1,
                    totalPages: data.totalPages || 1,
                })
            } catch (error) {
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [selectedCategory, currentPage])

    useEffect(() => {
        setCurrentPage(1)
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.imgUrl}
            unitPrice={product.unitPrice}
          />
        ))}
      </div>
      
      
        <div className="flex justify-center mt-8">
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      
    </div>
  )
}

export default ProductGrid