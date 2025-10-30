import {createBrowserRouter} from 'react-router'
import Home from '../pages/Home.tsx'
import AboutUs from '../pages/AboutUs.tsx'
import Contact from '../pages/Contact.tsx'
import NotFound from '../pages/NotFound.tsx'
import Login from '../pages/Login.tsx'
import SignUp from '../pages/SignUp.tsx'
import Layout from '../layout/Layout.tsx'
import Product from '../pages/Product.tsx'
import Orders from '../pages/Orders.tsx'
import Products from '../pages/admin/Products.tsx'
import AdminLayout from '../layout/AdminLayout.tsx'
import Pedidos from '../pages/admin/Pedidos.tsx'
import Usuarios from '../pages/admin/Usuarios.tsx'
import NuevoProducto from '../pages/admin/NuevoProducto.tsx'
import EditarProducto from '../pages/admin/EditarProducto.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        errorElement: <NotFound />,
        children: [
            {
                index: true,    
                Component: Home
            },
            {
                path: "/productos",
                Component: Product,
            },
            {
                path: "/pedidos",
                Component: Orders,
            },
            {
                path: "/nosotros",
                Component: AboutUs
            },
            {
                path: "/contacto",
                Component: Contact
            }
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/registrarse",
        Component: SignUp
    },
    {
        path: "/admin",
        Component: AdminLayout,
        children: [
            {
                index: true,
                Component: Products
            },
            {
                path: "pedidos",
                Component: Pedidos
            },
            {
                path: "usuarios",
                Component: Usuarios
            },
            {
                path: "añadir",
                Component: NuevoProducto
            },
            {
                path: "editar/:id",
                Component: EditarProducto
            }
        ]
    }
])

export default router