import express from 'express'
import dotenv from 'dotenv'
import './db/db'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import userRoute from './routes/userRoute'
import authRoute from './routes/authRoute'
import orderRoute from './routes/orderRoute'
import cors from 'cors'

dotenv.config()

const PORT = process.env.SERVER_PORT || 4000

//config
const app = express()

//middlewares
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}))

//endpoint inicial
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server corriendo correctamente!" })
})

//endpoints
app.use("/categorias", categoryRoute)
app.use("/productos", productRoute)
app.use("/usuarios", userRoute)
app.use("/auth", authRoute)
app.use("/pedidos", orderRoute)


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})