import { Outlet } from "react-router"
import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import { CartProvider } from "../context/CartContext"
import FloatingCartButton from "../components/cart/FloatingCartButton"

const Layout = () => {
  return (
      <CartProvider>
        <NavBar />
        <Outlet />
        <Footer />
        <FloatingCartButton />
      </CartProvider>
  )
}

export default Layout