import { Outlet } from "react-router"
import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"

const Layout = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout