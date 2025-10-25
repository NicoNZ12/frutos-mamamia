import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { handleAuth } from "../api/auth/handle-auth"
import toast from "react-hot-toast"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate()

    const url = import.meta.env.VITE_SERVER_URL + "auth/login"

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const user = {
            email,
            password,
        }

        setLoading(true)

        try{
            if(password.length < 8) {
                throw new Error("La contraseña debe tener al menos 6 caracteres");
            }

            const result = await handleAuth(url, user)

            if(result.success){
                login(result.result.token, { expires: 1 });
                toast.success("¡Inicio de sesión exitoso!")
                navigate("/", {replace: true})

                if(rememberMe) {
                    localStorage.setItem("email", email);
                }else {
                    localStorage.removeItem("email");
                }

            }else {
                toast.error(result.result.error || result.result.message || "Error al iniciar sesión")
            }
        }catch(error){
            const err = error as Error
            toast.error(err.message)
        } finally {
            setLoading(false)
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary mb-2">Iniciar Sesión</h1>
          <h2 className="text-lg text-secondary-400">Ingresa tu email y contraseña para acceder a tu cuenta</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-secondary-300"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
                  Contraseña
              </label>
              <div className="relative">
                  <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-secondary-300"
                      placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    title={showPassword ? "Ocultar" : "Mostrar"}
                  >
                    {showPassword ? (
                        <VisibilityIcon className="h-5 w-5" />

                    ) : (
                        <VisibilityOffIcon className="h-5 w-5" />
                    )}
                  </button>
              </div>
            </div>  
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-400">
                  Recordarme
                </label>
              </div>
            </div>        

            <button 
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors cursor-pointer ${
                        loading 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-primary-600'
                }`}
            >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-secondary-400">
              ¿No tienes cuenta?{' '}
              <Link to="/registrarse" className="text-primary hover:text-primary-600 font-semibold transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login