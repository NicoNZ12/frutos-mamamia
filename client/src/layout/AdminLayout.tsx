import { Outlet } from "react-router"
import SideBarMenu from "../components/navigation/SideBarMenu"

const AdminLayout = () => {
  return (
    <div className="min-h-screen mt-10 lg:flex lg:mt-0">
        <SideBarMenu />

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout