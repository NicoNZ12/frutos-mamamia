import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../model/userModel';

dotenv.config()

const jwt_secret = process.env.JWT_SECRET

export const generateToken = (userData: IUser) => {
    if (!jwt_secret) {
        throw new Error("JWT_SECRET no está definida como variable.");
    }

    const user = {
        id: userData.id,
        isAdmin: userData.isAdmin
    };

    return jwt.sign(user, jwt_secret, { expiresIn: "1h" })
}