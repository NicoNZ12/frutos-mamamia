import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IAuthRequest, IUserPayload } from '../interfaces/authRequest';

dotenv.config()

const jwt_secret = process.env.JWT_SECRET

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]

        if (!token) {
            res.status(401).json({ message: "Error de autenticación.", error: "Acceso denegado, token requerido." })
            return
        }

        if (!jwt_secret) {
            throw new Error("Variable secreta no asignada.")
        }

        const decoded = jwt.verify(token, jwt_secret) as IUserPayload

        if (!decoded) {
            res.status(401).json({ message: "Error de autenticación.", error: "Token inválido." })
            return
        }

        const authReq = req as IAuthRequest
        authReq.user = decoded
        next()


    } catch (error) {
        res.status(401).json({ message: "Error de autenticación-", error: "Token inválido o expirado." })
    }

}