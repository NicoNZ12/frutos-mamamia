import { Request, Response } from 'express'
import User from '../model/userModel'
import { saveUser } from '../services/userService'

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try{
            const { name, lastName, email, password } = req.body

            if(!name || !lastName || !email || !password){
                res.status(400).json({ message: "Nombre, apellido, email y contraseña son obligatorios." })
                return
            }

            const hashedPassword = await User.hashPassword(password)

            const newUser = {
                ...req.body,
                name,
                lastName,
                email,
                password: hashedPassword,
            }

            const savedUser = await saveUser(newUser)

            res.status(201).json({ message: "Usuario registrado correctamente.", payload: savedUser })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al registrar el usuario.", error: err.message })
        }
    }
}