import Footer from "../components/navigation/Footer"
import NavBar from "../components/navigation/NavBar"
import {features} from '../constants/features.ts'

const Home = () => {
  return (
    <>
        <NavBar />

        <section className="border-y border-border py-12">
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
                  <p className="text-md text-dark-500/80 leading-relaxed">{feature.description}</p>
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