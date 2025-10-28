import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/imgs/logo2.webp'
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const SideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navigate = useNavigate()

  return (
    <>
      {/* menu responsive */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-secondary-900 text-white rounded-md hover:bg-secondary-800 transition-colors"
      >
        {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-60 bg-secondary-900 text-white flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className='mt-8 md:mt-0'>
          <div className="p-6 text-xl font-bold text-primary border-b border-secondary-500">
            Frutos Mamamia
            <h2 className='text-white text-lg font-normal'>Almacén Natural</h2>
          </div>
          <nav className="mt-8 px-4">
            <ul className="space-y-2 mb-4">
              <NavLink
                to="/admin"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors nav-links"
              >
                <InventoryIcon className="h-5 w-5 mr-3" />
                Productos
              </NavLink>

              <NavLink
                to="/admin/pedidos"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors nav-links"
              >
                <ShoppingBasketIcon className="h-5 w-5 mr-3" />
                Pedidos
              </NavLink>
              
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-secondary-500">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">Admin</div>
              <div className="text-xs text-gray-400 truncate">
                admin@frutosmamamia.com
              </div>
            </div>
          </div>
          <div 
            className="flex items-center mt-6 text-white hover:text-white cursor-pointer text-sm transition-colors nav-links"
            onClick={() => {
                logout()
                navigate('/');
            }}
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarMenu;