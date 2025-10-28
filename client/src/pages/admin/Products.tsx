import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// datos de prueba
const mockProducts = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/100x100/EAD9C8/8C5A2B.png?text=FM&font=roboto',
    name: 'Almendras Premium',
    description: 'Almendras crudas de California, sin sal.',
    category: 'Nueces',
    price: '$12.99',
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/100x100/DABEA7/8C5A2B.png?text=FM&font=roboto',
    name: 'Mix de Frutos Secos',
    description: 'Mezcla especial de nueces, almendras y avellanas',
    category: 'Nueces',
    price: '$15.99',
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/100x100/A06C46/FFFFFF.png?text=FM&font=roboto',
    name: 'Dátiles Medjool',
    description: 'Dátiles grandes y jugosos de origen orgánico',
    category: 'Frutas Deshidratadas',
    price: '$9.99',
  },
  {
    id: 4,
    imageUrl: 'https://placehold.co/100x100/D4A77C/8C5A2B.png?text=FM&font=roboto',
    name: 'Nueces de Macadamia',
    description: 'Nueces de macadamia tostadas ligeramente',
    category: 'Nueces',
    price: '$18.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
  {
    id: 5,
    imageUrl: 'https://placehold.co/100x100/B5B88D/8C5A2B.png?text=FM&font=roboto',
    name: 'Pistachos Tostados',
    description: 'Pistachos tostados con sal marina',
    category: 'Nueces',
    price: '$14.99',
  },
];


const Products = () => {
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
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
        >
          <AddIcon className="h-5 w-5" />
          Añadir Producto
        </button>
      </header>

      
      <div className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            className="w-full py-2.5 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-h-[294px] overflow-auto sm:max-h-[370px] 2xl:max-h-[600px]">
        
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
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-secondary-100 transition-colors">
                
                <td className="px-6 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                
                <td className="px-6 py-2">
                  <div className="font-medium text-gray-800">{product.name}</div>
                </td>
                
                <td className="px-6 py-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary-200 text-secondary-500">
                    {product.category}
                  </span>
                </td>
                
                <td className="px-6 py-2 font-medium text-gray-800">
                  {product.price}
                </td>
                                
                <td className="px-6 py-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-secondary-500/80 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="text-secondary-500/80 hover:text-red-600 transition-colors cursor-pointer"
                      title="Eliminar"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Products;