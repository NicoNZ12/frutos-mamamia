import { Outlet } from "react-router"
import SideBarMenu from "../components/navigation/SideBarMenu"
import { NotificationProvider } from "../context/NotificationContext"

const AdminLayout = () => {
  return (
    <div className="min-h-screen mt-10 lg:flex lg:mt-0">
      <NotificationProvider>

        <SideBarMenu />

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
        
      </NotificationProvider>
    </div>
  )
}

export default AdminLayout