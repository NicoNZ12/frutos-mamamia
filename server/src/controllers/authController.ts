import { Request, Response } from 'express'
import User from '../model/userModel'
import { saveUser } from '../services/userService'
import { generateToken } from '../utils/generateToken'

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

            await saveUser(newUser)

            res.status(201).json({ message: "Usuario registrado correctamente.", payload: {name, lastName,email} })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al registrar el usuario.", error: err.message })
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try{
            const { email, password } = req.body

            if(!email || !password){
                res.status(400).json({ message: "Email y contraseña son obligatorios." })
                return
            }

            //validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if(!emailRegex.test(email)){
                res.status(400).json({ message: "El formato del email es inválido." })
                return
            }

            const user = await User.findOne({ email: email })

            if(!user){
                res.status(401).json({ message: "Credenciales inválidas." })
                return
            }

            const isPasswordValid = await user.comparePassword(password, user.password)

            if(!isPasswordValid){
                res.status(401).json({ message: "Credenciales inválidas." })
                return
            }

            const token = generateToken(user)

            res.status(200).json({ message: "Inicio de sesión exitoso.", token: token })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al iniciar sesión.", error: err.message })
        }
    }
}