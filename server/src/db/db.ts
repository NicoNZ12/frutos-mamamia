import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const DB_URI = process.env.MONGO_URI as string

(async (DB_URI: string) => {
    try{
        if(!DB_URI) throw new Error("Falta la URL de conexión de la BD.")

        await mongoose.connect(DB_URI)
        console.log("Base de datos conectada.")

    }catch(error){
        const err = error as Error
        console.log("Error al conectarse a la BD:", err.message)
    }

})(DB_URI)

