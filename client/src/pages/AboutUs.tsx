import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import logo from '../assets/imgs/logo2.webp'
import almendras from '../assets/imgs/almendras.webp'
import cereal from '../assets/imgs/cereal.webp'
import { products } from "../constants/features"

const AboutUs = () => {
  return (
    <>
        <NavBar />

        <main className="min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Sobre Nosotros</h1>
                    <p className="text-xl text-dark-500/80 max-w-3xl mx-auto leading-relaxed">
                        Somos un emprendimiento familiar dedicado a brindar los mejores frutos secos, 
                        con pasión por la calidad y el sabor natural que la tierra nos ofrece.
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-6">Nuestra Historia</h2>
                        <div className="space-y-4 text-dark-500/80 leading-relaxed">
                            <p>
                                Comenzamos este emprendimiento con una simple idea: acercar a las familias 
                                sanrafaelinas los frutos secos más frescos y nutritivos, seleccionados 
                                cuidadosamente para garantizar la máxima calidad.
                            </p>
                            <p>
                                Desde nuestros inicios, hemos construido relaciones sólidas con productores 
                                locales, asegurando que cada producto que llega a tu mesa mantenga 
                                sus propiedades naturales y su sabor único.
                            </p>
                        </div>
                    </div>
                    <div className="h-80 flex items-center justify-center">
                        <img src={logo} alt="Logo de Mamamia" className="h-80 w-120 rounded-lg object-cover"/>
                    </div>
                </div>

                {/* Products Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-secondary text-center mb-2">¿Qué Vendemos?</h2>
                    <h3 className="text-xl text-dark-500/80 text-center mb-12">Algunos de los tantos porductos que podes encontrar en nuestra tienda</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {
                            products.map(product => (
                                <div className="text-center">
                                    <div className="bg-primary-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl">{product.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-secondary mb-2">{product.title}</h3>
                                    <p className="text-dark-500/80">{product.description}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-64 flex items-center justify-center">
                            <img src={almendras} alt="Logo de Mamamia" className="h-70 w-140 rounded-lg object-cover"/>
                        </div>
                        <div className="h-64 flex items-center justify-center">
                            <img src={cereal} alt="Logo de Mamamia" className="h-70 w-140 rounded-lg object-cover"/>
                        </div>
                    </div>
                </div>

                
            </div>
        </main>
        
        <Footer />
    </>
  )
}

export default AboutUs