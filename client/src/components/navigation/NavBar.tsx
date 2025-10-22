import { useState } from 'react';
import logo from '../../assets/imgs/logo.png';
import { NavLink, Link } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-dark-300 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo Fruto Mamamia" className='w-3xs mb-2'/>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className="nav-links"
            >
              Inicio
            </NavLink>
            <NavLink
              to="/"
              className="nav-links"
            >
              Productos
            </NavLink>
            <NavLink
              to="/nosotros"
              className="nav-links"
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className="nav-links"
            >
              Contacto
            </NavLink>
          </div>

          <div className='hidden items-center gap-6 md:flex'>
            <NavLink
              to="/login"
              className="nav-links"  
            >
              Iniciar Sesión
            </NavLink>

            <NavLink
              to="/registrarse"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-400 transition-colors"
            >
              Registrarse
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
                  
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}

            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <NavLink 
                to="/" 
                className="nav-links--mobile" 
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </NavLink>
              <NavLink 
                to="/" 
                className="nav-links--mobile" 
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </NavLink>
              <NavLink 
                to="/nosotros" 
                className="nav-links--mobile" 
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </NavLink>
              <NavLink 
                to="/contacto" 
                className="nav-links--mobile" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </NavLink>
              <div className="border-t pt-2 mt-2">
                <NavLink 
                  to="/login" 
                  className="nav-links--mobile" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </NavLink>
                <NavLink 
                  to="/registrarse" 
                  className="block mx-3 my-2 px-3 py-2 bg-primary text-white text-center rounded-md hover:bg-primary-400 transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
