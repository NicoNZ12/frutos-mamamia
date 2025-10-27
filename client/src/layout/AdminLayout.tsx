import { Outlet } from "react-router"
import SideBarMenu from "../components/navigation/SideBarMenu"

const AdminLayout = () => {
  return (
    <>
        <SideBarMenu />
        <Outlet />
    </>
  )
}

export default AdminLayout