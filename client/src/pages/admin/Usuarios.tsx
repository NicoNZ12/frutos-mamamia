import { useProduct } from "../../context/ProductContext";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import { PaginationControls } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../api/users/fetchUser";

interface IUser {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    address: string,
    phoneNumber: string,
    isAdmin: boolean,
}

interface IUsersResponse {
    users: IUser[],
    page: number,
    totalPages: number,
}

const Usuarios = () => {
    const [users, setUsers] = useState<IUsersResponse>({ users: [], page: 1, totalPages: 1 });
    const [loading, setLoading] = useState<boolean>(false);
    const {
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        currentPage
    } = useProduct();

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            const users = await fetchUsers(debouncedQuery)
            setUsers(users)
            setLoading(false)
        }
        getUsers()

    }, [debouncedQuery, currentPage])

  return (
    <main>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Usuarios
          </h1>
          <p className="mt-1 text-secondary-500/80">
            Administra los usuarios de tu plataforma
          </p>
        </div>
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
            placeholder="Buscar usuario por nombre..."
            className="w-full py-2.5 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-h-[294px] overflow-auto sm:max-h-[360px] 2xl:max-h-[600px]">
        {/* tabla de productos */}
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider w-1/3">
                Nombre completo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500/80 uppercase tracking-wider">
                Dirección
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
            ) : users.users && users.users.length > 0 ? (
              users.users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-secondary-100 transition-colors"
                >
                  <td className="px-6 py-2">
                    <div className="font-medium text-gray-800">
                      {user.name} {user.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-2 font-medium text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-6 py-2">
                    {
                        user.isAdmin ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Administrador
                            </span>
                        ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Usuario
                            </span>
                        )
                    }
                  </td>
                  <td className="px-6 py-2 font-medium text-gray-800">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-2 font-medium text-gray-800">
                    {user.address}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-lg text-secondary-500/80">
                    No se encontraron usuarios
                  </p>
                  <p className="mt-1 text-sm text-secondary-400/80">
                    {searchQuery
                      ? "Intenta ajustar tu búsqueda."
                      : "No hay usuarios para mostrar."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {users && (
        <div className="flex justify-center mt-4">
          <PaginationControls
            currentPage={users.page}
            totalPages={users.totalPages}
            onPageChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </main>
  )
}

export default Usuarios
