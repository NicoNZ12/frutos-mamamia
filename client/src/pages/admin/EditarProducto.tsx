import ProductForm from "../../components/products/ProductForm"

const EditarProducto = () => {
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
      <ProductForm mode="edit" />
    </main>
  )
}

export default EditarProducto