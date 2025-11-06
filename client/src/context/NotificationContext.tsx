import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getSocket } from "../websocket/socket";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

interface INotification {
    message: string
    date: Date
}

interface NotificationContextType {
    notification: INotification | null
    refreshOrders: () => void
    setRefreshCallback: (callback: () => void) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<INotification | null>(null);
  const [refreshCallback, setRefreshCallback] = useState<() => void>(() => () => {});
  const refreshCallbackRef = useRef(refreshCallback);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    refreshCallbackRef.current = refreshCallback;
  }, [refreshCallback]);

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    let cleanupFunction: (() => void) | null = null

    const setupSocket = () => {
      const socket = getSocket()

      if (!socket) {
        setTimeout(setupSocket, 1000)
        return
      }


      socket.removeAllListeners("newOrder")

      if (!socket.connected) {
        socket.connect()
      }

      const handleNewOrder = (data: INotification) => {
        
        setNotification(data)
        
        const audio = new Audio("/notificacion-general-3.mp3")
        audio.play().catch((error) => {
          console.error("Error al reproducir sonido:", error)
        })

        toast.success(`${data.message}`, {
          duration: 5000,
          icon: "🔔"
        })

        if (refreshCallbackRef.current) {
          refreshCallbackRef.current()
        }
      }

      socket.on("newOrder", handleNewOrder)
      
      socket.on("connect", () => {
        console.log("Socket conectado exitosamente")
      })

      socket.on("disconnect", () => {
        console.log("Socket desconectado")
      })

      cleanupFunction = () => {
        console.log("Limpiando listeners de socket...")
        socket.off("newOrder", handleNewOrder)
        socket.off("connect")
        socket.off("disconnect")
      }
    }

    const timeoutId = setTimeout(setupSocket, 100)
    
    return () => {
      clearTimeout(timeoutId)
      if (cleanupFunction) {
        cleanupFunction()
      }
    }
  }, [isAuthenticated])

  const refreshOrders = () => {
    if (refreshCallback) {
      refreshCallback()
    }
  }

  const setRefreshCallbackHandler = (callback: () => void) => {
    setRefreshCallback(() => callback)
  }

  return (
    <NotificationContext.Provider value={{ 
      notification, 
      refreshOrders, 
      setRefreshCallback: setRefreshCallbackHandler 
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotificationContext() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotificationContext debe usarse dentro de un NotificationProvider");
    }
    return context;
}

export { useNotificationContext };
