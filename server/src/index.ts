import express from 'express'
import dotenv from 'dotenv'
import './db/db'
import categoryRoute from './routes/categoryRoute'

dotenv.config()

const PORT = process.env.SERVER_PORT || 3000

//config
const app = express()

//middlewares
app.use(express.json())

//endpoint inicial
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server corriendo correctamente!" })
})

//endpoints
app.use("/categorias", categoryRoute)


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})