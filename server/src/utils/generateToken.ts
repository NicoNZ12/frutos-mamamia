import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../model/userModel';

dotenv.config()

const jwt_secret = process.env.JWT_SECRET

export const generateToken = (userData: IUser) => {
    if (!jwt_secret) {
        throw new Error("Variable secreta no asignada.");
    }

    const user = {
        id: userData.id,
        email: userData.email,
        isAdmin: userData.isAdmin
    };

    return jwt.sign(user, jwt_secret, { expiresIn: "1h" })
}