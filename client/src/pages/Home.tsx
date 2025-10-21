import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import {features} from '../constants/features.ts'
import banner from '../assets/imgs/banner.webp'
import { Link } from "react-router"
import EastIcon from '@mui/icons-material/East';

const Home = () => {
  return (
    <>
        <NavBar />     

        <section className="relative h-screen min-h-dvh overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={banner} 
              alt="Banner Frutos Mamamia" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Snacks que impulsan
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Descubre nuestra selección premium de frutos secos, frutas deshidratadas y más. Calidad excepcional directo a tu hogar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-400 transition-colors text-lg"
                >
                  Ver Productos
                  <EastIcon className="ml-2 w-5 h-5 inline-block" />
                </Link>
                <Link
                  to="/contacto"
                  className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-colors text-lg"
                >
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <div className="text-white">
                      <feature.icon />
                    </div>
                  </div>
                  <h3 className="text-xl mb-2 font-semibold text-primary">{feature.title}</h3>
                  <p className="text-md text-dark-500/800 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
    </>
  )
}

export default Home