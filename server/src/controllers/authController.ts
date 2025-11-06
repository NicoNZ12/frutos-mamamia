import { NextFunction, Request, Response } from 'express'
import User from '../model/userModel'
import { saveUser } from '../services/userService'
import { generateToken } from '../utils/generateToken'
import { AppError } from '../utils/appError'

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { name, lastName, email, password } = req.body

            if(!name || !lastName || !email || !password){
                throw new AppError(
                    "Nombre, apellido, email y contraseña son obligatorios.",
                    400
                )
            }

            const existingUser = await User.findOne({ email: email })
            if(existingUser){
                throw new AppError(
                    "Error al registrar el usuario.",
                    400,
                    "El email ya está registrado."
                )
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
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { email, password } = req.body

            if(!email || !password){
                throw new AppError(
                    "Email y contraseña son obligatorios.",
                    400
                )
            }

            //validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if(!emailRegex.test(email)){
                throw new AppError(
                    "El formato del email es inválido.",
                    400
                )
            }

            const user = await User.findOne({ email: email })

            if(!user){
                throw new AppError(
                    "Credenciales inválidas.",
                    401
                )
            }

            const isPasswordValid = await user.comparePassword(password, user.password)

            if(!isPasswordValid){
                throw new AppError(
                    "Credenciales inválidas.",
                    401
                )
            }

            const token = generateToken(user)

            res.status(200).json({ message: "Inicio de sesión exitoso.", token: token })

        }catch(error){
            next(error)
        }
    }
}