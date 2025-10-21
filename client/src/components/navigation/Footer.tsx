import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
   return (
    <footer className="border-t border-dark-300 bg-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-16">

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Frutos Mamamia</h3>
            <p className="text-sm leading-relaxed text-secondary-400">
              La naturaleza en tus manos. Frutos secos de la más alta calidad.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="hover:text-primary transition-colors text-secondary-400">
                  Todos los Productos
                </a>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-primary transition-colors text-secondary-400">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors text-secondary-400">
                  Contacto
                </a>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Síguenos</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 hover:bg-primary hover:text-white transition-colors"
              >
                <FacebookIcon className='w-4 h-4'/>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 hover:bg-primary hover:text-white transition-colors"
              >
                <InstagramIcon className='w-4 h-4'/>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 hover:bg-primary hover:text-white transition-colors"
              >
                <WhatsAppIcon className='w-4 h-4'/>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-300 pt-8 text-center text-sm text-secondary-400">
          <p>&copy; {new Date().getFullYear()} Frutos Mamamia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer