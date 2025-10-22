import {createBrowserRouter} from 'react-router'
import Home from '../pages/Home.tsx'
import AboutUs from '../pages/AboutUs.tsx'
import Contact from '../pages/Contact.tsx'
import NotFound from '../pages/NotFound.tsx'
import Login from '../pages/Login.tsx'
import SignUp from '../pages/SignUp.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Home
    },
    {
        path: "/nosotros",
        Component: AboutUs
    },
    {
        path: "/contacto",
        Component: Contact
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
        path: '*',
        Component: NotFound
    }
])

export default router