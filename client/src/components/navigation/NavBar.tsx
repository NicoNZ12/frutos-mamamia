import logo from '../../assets/imgs/logo.png';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-dark-300 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo Fruto Mamamia" className='w-3xs mb-2'/>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </a>
            <a
              href="/products"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Productos
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </a>
            <a
              href="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
