import express from 'express'
import dotenv from 'dotenv'
import './db/db'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import userRoute from './routes/userRoute'
import authRoute from './routes/authRoute'
import orderRoute from './routes/orderRoute'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'
import { authentication } from './middlewares/authMiddleware'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config()

const PORT = process.env.SERVER_PORT || 4000

const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    }
})

//config socket.io
app.set("io", io)

io.on("connection", socket => {
    console.log("Conectado al servidor socket")
})

//middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

//endpoint inicial
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server corriendo correctamente!" })
})

//endpoints
app.use("/categorias", categoryRoute)
app.use("/productos", productRoute)
app.use("/usuarios", userRoute)
app.use("/auth", authRoute)
app.use("/pedidos", authentication, orderRoute)

//Manejador de eventos global
app.use(errorHandler);


httpServer.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})