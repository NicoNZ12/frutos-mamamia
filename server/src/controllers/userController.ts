import { NextFunction, Request, Response } from "express";
import { getAllUsers, getUser, getUsersBySearch } from "../services/userService";
import { AppError } from "../utils/appError";
export class UserController {
    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { name } = req.query

            const pageNumber = parseInt(req.params.page as string) || 1
            const limitNumber = parseInt(req.params.limit as string) || 10

            if(typeof name === "string"){
                const users = await getUsersBySearch(name)
                res.status(200).json({
                    users,
                    page: 1,
                    totalPages: 1,
                    totalUsers: users.length,
                    limit: users.length
                })
                return
            }

            const users = await getAllUsers(pageNumber, limitNumber)
            res.status(200).json(users)

        }catch(error){
            next(error)
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id } = req.params

            if(!id){
               throw new AppError(
                    "El ID del usuario es obligatorio.",
                    400
                )
            }

            const user = await getUser(id)

            if(!user){
                throw new AppError(
                    "No se encontró usuario con ese ID.",
                    404
                )
            }

            res.status(200).json(user)

        }catch(error){
           next(error)
        }
    }

}