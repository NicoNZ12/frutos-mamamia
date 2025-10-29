import { Request, Response } from "express";
import { getAllUsers, getUser, getUsersBySearch } from "../services/userService";
export class UserController {
    static async getUsers(req: Request, res: Response): Promise<void> {
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
            const err = error as Error
            res.status(500).json({ message: "Error al obtener los usuarios.", error: err.message })
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params

            if(!id){
                res.status(400).json({ message: "El ID es obligatorio." })
                return
            }

            const user = await getUser(id)

            if(!user){
                res.status(404).json({ message: "No se encontró usuario con ese ID" })
                return
            }

            res.status(200).json(user)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener el usuario.", error: err.message})
        }
    }

}