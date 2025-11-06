import { createContext, useContext, useEffect, useState } from "react";
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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const setupSocket = () => {
      const socket = getSocket()

      if (!socket) {
        setTimeout(setupSocket, 1000)
        return
      }

      if (!socket.connected) {
        socket.connect()
      }

      const handleNewOrder = (data: INotification) => {
        
        setNotification(data)
        
        const audio = new Audio("/notificacion-general-3.mp3")
        audio.play().catch((error) => {
          console.error("Error al reproducir el sonido de notificación:", error)
        })

        toast.success(`${data.message}`, {
          duration: 5000,
          icon: "🔔"
        })

        if (refreshCallback) {
          refreshCallback()
        }
      }

      socket.on("newOrder", handleNewOrder)
      
      socket.on("connect", () => {
        console.log("Socket conectado en NotificationContext")
      })

      socket.on("disconnect", () => {
        console.log("Socket desconectado en NotificationContext")
      })

      return () => {
        socket.off("newOrder", handleNewOrder)
        socket.off("connect")
        socket.off("disconnect")
      }
    }

    const timeoutId = setTimeout(setupSocket, 100)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [refreshCallback, isAuthenticated])

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
