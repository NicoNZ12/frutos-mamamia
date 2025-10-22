import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { handleAuth } from "../api/auth/handle-auth"
import toast from "react-hot-toast"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const url = import.meta.env.VITE_SERVER_URL + "auth/register"

    const validateForm = () => {
        if (nombre.length < 2) {
            toast.error("El nombre debe tener al menos 3 caracteres")
            return false
        }
        if (apellido.length < 2) {
            toast.error("El apellido debe tener al menos 3 caracteres")
            return false
        }
        if (!email.includes("@")) {
            toast.error("Por favor ingresa un email válido")
            return false
        }
        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
        if (!validateForm()) {
            return
        }
        
        setLoading(true)
        
        try{
            const newAccount = {
                name: nombre,
                lastName: apellido,
                email,
                password
            }

            const result = await handleAuth(url, newAccount)
                        
            if (result.success) {
                toast.success("¡Cuenta creada exitosamente!")
                clearForm()
                navigate("/login", {replace: true})
                
            } else {
                toast.error(result.result.error || "Error al crear la cuenta")
            }

        }catch(error){
            const err = error as Error
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const clearForm = () => {
        setNombre("")
        setApellido("")
        setEmail("")
        setPassword("")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-secondary mb-2">Registrarse</h1>
                <h2 className="text-lg text-secondary-400">Completa con tus datos para crear tu cuenta</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">            
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-secondary mb-2">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-secondary-300"
                        placeholder="Juan"
                    />
                    </div>

                    <div>
                    <label htmlFor="apellido" className="block text-sm font-medium text-secondary mb-2">
                        Apellido
                    </label>
                    <input 
                        type="text" 
                        id="apellido" 
                        name="apellido" 
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-secondary-300"
                        placeholder="Pérez"
                    />
                    </div>

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

                    <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors cursor-pointer ${
                            loading 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-primary text-white hover:bg-primary-600'
                        }`}
                    >
                    {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-secondary-400">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-600 font-semibold transition-colors cursor-pointer">
                        Inicia sesión aquí
                    </Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp