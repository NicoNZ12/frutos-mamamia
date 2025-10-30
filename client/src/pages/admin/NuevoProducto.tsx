import ProductForm from "../../components/products/ProductForm"

const NuevoProducto = () => {
  return (
    <main>
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Añadir Nuevo Producto
          </h1>
          <p className="mt-1 text-secondary-500/80">
            Completa el formulario para crear un nuevo producto
          </p>
        </div>
      </header>
      <ProductForm mode="add"/>
    </main>
  )
}

export default NuevoProducto