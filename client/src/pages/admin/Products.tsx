import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProduct } from "../../context/ProductContext";
import { PaginationControls } from "../../components/Pagination";
import { CircularProgress } from "@mui/material";
import { categoryColors } from "../../constants/categoryColors";
import { handleDeleteAlert } from "../../utils/handle-alert";
import { Link } from "react-router";

const Products = () => {
  const {
    products,
    categories,
    pagination,
    setCurrentPage,
    loading,
    searchQuery,
    setSearchQuery,
    handleDeleteProduct
  } = useProduct();
  
  return (
    <main>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Productos
          </h1>
          <p className="mt-1 text-secondary-500/80">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <Link
          to="/admin/añadir"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
        >
          
          <AddIcon className="h-5 w-5" />
          Añadir Producto
        </Link>
      </header>

      <div className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos por nombre..."
            className="w-full py-2.5 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-h-[294px] overflow-auto sm:max-h-[360px] 2xl:max-h-[600px]">
        {/* tabla de productos */}
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider w-1/3">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <CircularProgress color="inherit" className="text-primary" />
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-secondary-100 transition-colors"
                >
                  <td className="px-6 py-2">
                    <img
                      src={
                        product.imgUrl ||
                        "https://placehold.co/100x100/EAD9C8/8C5A2B.png?text=FM"
                      }
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-2">
                    <div className="font-medium text-gray-800">
                      {product.name}
                    </div>
                    <div className="text-sm text-secondary-400">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        (categoryColors)[categories.find((cat) => cat._id === product.category)?.name || "Sin categoría"]?.bg || "bg-gray-200"
                      } ${
                        (categoryColors)[categories.find((cat) => cat._id === product.category)?.name || "Sin categoría"]?.text || "text-gray-500"
                      }`}
                    >
                      {categories.find((cat) => cat._id === product.category)?.name || "Sin categoría"}
                    </span>
                  </td>
                  <td className="px-6 py-2 font-medium text-gray-800">
                    ${product.price}
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/editar/${product._id}`}
                        className="text-secondary-500/80 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <EditIcon className="h-5 w-5" />
                      </Link>
                      <button
                        type="button"
                        className="text-secondary-500/80 hover:text-red-600 transition-colors cursor-pointer"
                        title="Eliminar"
                        onClick={() => {
                          handleDeleteAlert(() => {
                            handleDeleteProduct(product._id)
                          })
                        }}
                      >
                        <DeleteIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-lg text-secondary-500/80">
                    No se encontraron productos
                  </p>
                  <p className="mt-1 text-sm text-secondary-400/80">
                    {searchQuery
                      ? "Intenta ajustar tu búsqueda."
                      : "No hay productos para mostrar."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <PaginationControls
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(_, page) => setCurrentPage(page)}
        />
      </div>
    </main>
  );
};

export default Products;
