import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import fotoContacto from '../assets/imgs/foto-contacto.webp'

const Contact = () => {
  return (
    <>
        <NavBar />
        <main className="min-h-screen flex items-center justify-center py-4 px-4">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div className="order-2 lg:order-1">
                    <img 
                        src={fotoContacto} 
                        alt="Contacto Frutos Mamamia" 
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                </div>

                <div className="order-1 lg:order-2">
                    <div className="text-center lg:text-left mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">¿Tenés alguna duda?</h2>
                        <h3 className="text-xl text-secondary-400">¡No dudes en escribirnos!</h3>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                                    <WhatsAppIcon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-secondary mb-1">Mariana</h4>
                                    <p className="text-primary font-medium">+54 9 2604 232224</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                                    <WhatsAppIcon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-secondary mb-1">Darío</h4>
                                    <p className="text-primary font-medium">+54 9 2604 312611</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default Contact