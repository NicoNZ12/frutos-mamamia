import { Outlet } from "react-router"
import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import { CartProvider } from "../context/CartContext"

const Layout = () => {
  return (
    <CartProvider>
      <NavBar />
      <Outlet />
      <Footer />
    </CartProvider>
  )
}

export default Layout