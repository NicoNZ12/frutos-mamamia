import {createBrowserRouter} from 'react-router'
import Home from '../pages/Home.tsx'
import AboutUs from '../pages/AboutUs.tsx'
import Contact from '../pages/Contact.tsx'
import NotFound from '../pages/NotFound.tsx'
import Login from '../pages/Login.tsx'
import SignUp from '../pages/SignUp.tsx'
import Layout from '../layout/Layout.tsx'
import Product from '../pages/Product.tsx'

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
    }
])

export default router