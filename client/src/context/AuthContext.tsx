import { useState, useEffect, type ReactNode, createContext, useContext } from "react"
import Cookies from "js-cookie"
import { connectSocket } from "../websocket/socket"

interface IAuthContext {
    token: string | null
    login: (token: string, options: ILoginOptions) => void
    logout: () => void
    isAuthenticated: boolean
}

interface ILoginOptions {
    expires: number
}

const authContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            setToken(token)
        }
    }, [])

    const login = (newToken: string, options: ILoginOptions) => {
        Cookies.set('token', newToken, options)
        setToken(newToken)
        connectSocket(newToken)
    }

    const logout = () => {
        Cookies.remove("token")
        setToken(null)
    }

    const isAuthenticated = !!token

    const value = {
        token,
        login,
        logout,
        isAuthenticated
    }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context
}