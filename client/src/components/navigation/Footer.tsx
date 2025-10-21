import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Link } from 'react-router'

const Footer = () => {
   return (
    <footer className="border-t border-dark-300 bg-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">

          <div className="space-y-4 flex-1 max-w-sm">
            <h3 className="text-lg font-bold text-primary">Frutos Mamamia</h3>
            <p className="text-sm leading-relaxed text-secondary-400">
              La naturaleza en tus manos. Frutos secos y deshidratados de la más alta calidad.
            </p>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="text-sm font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors text-secondary-400">
                  Todos los Productos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="text-sm font-semibold">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nosotros" className="hover:text-primary transition-colors text-secondary-400">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-primary transition-colors text-secondary-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="text-sm font-semibold">Síguenos</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/frutosmamamia?locale=es_LA"
                target='_blank'
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 hover:bg-primary hover:text-white transition-colors"
              >
                <FacebookIcon className='w-4 h-4'/>
              </a>
              <a
                href="https://www.instagram.com/frutos_mamamia/"
                target='_blank'
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 hover:bg-primary hover:text-white transition-colors"
              >
                <InstagramIcon className='w-4 h-4'/>
              </a>
              <a
                href="https://www.whatsapp.com/channel/0029Vag8zRt5fM5b0lnrOa0T"
                target='_blank'
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