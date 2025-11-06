import CategoryList from "../components/products/CategoryList"
import ProductGrid from "../components/products/ProductGrid"
import { useProduct } from "../context/ProductContext"

const Product = () => {
  const { selectedCategory, setSelectedCategory } = useProduct()

  return (
    <>
      <main className="container mx-auto px-4 py-8">
      
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-primary mb-6">Nuestros productos</h2>
          <h3 className="text-xl text-dark-500/80 max-w-2xl mx-auto">
            Descubre nuestra selección de frutos secos, deshidratados, productos naturales y más...
          </h3>
        </div>

        {/* Sección de las categorías */}
        <section className="my-12">
          <h4 className="text-xl font-semibold text-dark-500/80 mb-6">Categorías</h4>
          <div className="flex justify-center">
            <CategoryList 
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
        </section>

        {/* Sección de los productos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold text-dark-500/80">
              {selectedCategory ? `Productos: ${selectedCategory}` : "Todos los productos"}
            </h4>
            
            {/* Botón para limpiar filtro */}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="px-4 py-2 text-secondary-500 bg-dark-200 hover:bg-dark-300 rounded-lg text-sm transition-colors"
              >
                Ver todos los productos
              </button>
            )}
          </div>
          
          <ProductGrid selectedCategory={selectedCategory} />
        </section>
      </main>
    </>
  )
}

export default Product
