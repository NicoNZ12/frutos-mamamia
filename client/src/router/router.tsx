import {createBrowserRouter} from 'react-router'
import Home from '../pages/Home.tsx'
import AboutUs from '../pages/AboutUs.tsx'
import Contact from '../pages/Contact.tsx'

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
    }
])

export default router