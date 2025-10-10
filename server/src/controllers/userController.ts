import { Request, Response } from "express";
import { getAllUsers, getUsersBySearch } from "../services/userService";
export class UserController {
    static async getUsers(req: Request, res: Response): Promise<void> {
        try{
            const pageNumber = parseInt(req.params.page as string) || 1
            const limitNumber = parseInt(req.params.limit as string) || 10

            const users = await getAllUsers(pageNumber, limitNumber)
            res.status(200).json(users)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener los usuarios.", error: err.message })
        }
    }

    static async searchUsers(req: Request, res: Response): Promise<void> {
        try{
            const { q } = req.query

            if(!q){
                res.status(400).json({ message: "El parámetro de búsqueda 'q' es obligatorio." })
                return
            }

            const users = await getUsersBySearch(q as string)
            res.status(200).json(users)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al buscar usuarios.", error: err.message })
        }
    }

}