import { Link } from "react-router"
import logo from '../assets/imgs/logo.png';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 px-4">
        <div className="text-center max-w-2xl mx-auto">
            <img src={logo} alt="Logo de Mamamia" className="w-60 md:w-80 mx-auto mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Oops! Al parecer no hay nada acá</h1>
            <h2 className="text-lg md:text-xl text-secondary-400 mb-8">Vuelve al inicio para seguir navegando en nuestra página</h2>
            <Link to="/" className="inline-block text-lg py-3 px-8 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors cursor-pointer">Volver al inicio</Link>
        </div>
    </div>
  )
}

export default NotFound