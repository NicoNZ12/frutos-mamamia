import logo from '../../assets/imgs/logo.png';
import { NavLink, Link } from 'react-router';

const NavBar = () => {
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
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </NavLink>
            <NavLink
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Productos
            </NavLink>
            <NavLink
              to="/nosotros"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
