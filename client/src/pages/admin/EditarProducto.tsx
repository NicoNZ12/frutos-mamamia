import { useEffect, useState } from "react"
import ProductForm, { type IProductFormData } from "../../components/products/ProductForm"
import { useParams } from "react-router"
import { fetchProduct } from "../../api/products/fetchProducts"
import toast from "react-hot-toast"

const EditarProducto = () => {
  const { id: productId } = useParams<{ id: string }>()
  console.log("Editing product with ID:", productId)
  const [product, setProduct] = useState<IProductFormData | undefined>(undefined)
  
  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
        const response = await fetchProduct(productId)
        setProduct(response)
      }else{
        toast.error("No se proporcionó un ID de producto válido.")
      }
    }
    getProduct()
  }, [productId])

  return (
    <main>
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Editar Producto
          </h1>
          <p className="mt-1 text-secondary-500/80">
            Actualiza la información del producto
          </p>
        </div>
      </header>
      <ProductForm product={product} mode="edit"  />
    </main>
  )
}

export default EditarProducto