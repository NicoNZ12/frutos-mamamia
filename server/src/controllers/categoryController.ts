import {NextFunction, Request, Response} from 'express'
import { getAllCategories, getOneCategory, removeCategory, saveCategory, updateCategory } from '../services/catageryService'
import { ICategory } from '../model/catageryModel'
import { AppError } from '../utils/appError'

export class CategoryController {
    static async getCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const categories = await getAllCategories()
            res.status(200).json(categories)

        }catch(error){
            next(error)
        }

    }

    static async getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const categoryID = req.params.id

            if(!categoryID){
                throw new AppError(
                    "El ID de la categoría es obligatorio.",
                    400
                )
            }

            const category = await getOneCategory(categoryID)

            if(!category){
                throw new AppError(
                    "No se encontró una categoría con ese ID.",
                    404
                )
            }

            res.status(200).json(category)

        }catch(error){
            next(error)
        }

    }

    static async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { name } = req.body

            if(!name){
                throw new AppError(
                    "El nombre de la categoría es obligatorio.",
                    400
                )
            }

            const newCategory = {
                name: name.toUpperCase()
            } 

            const savedCategory = await saveCategory(newCategory as ICategory)

            res.status(201).json({ message: "Categoría creada correctamente.", payload: savedCategory })

        }catch(error){
            next(error)
        }
    }

    static async editCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const categoryID = req.params.id
            const { name } = req.body

            if(!categoryID){
                throw new AppError(
                    "El ID de la categoría es obligatorio.",
                    400
                )
            }

            if(!name){
                throw new AppError(
                    "El nombre de la categoría es obligatorio.",
                    400
                )
            }

            const updatedCategory = await updateCategory(categoryID, name.toUpperCase())

            if(!updatedCategory){
                throw new AppError(
                    "No se encontró una categoría con ese ID para actualizar.",
                    404
                )
            }

            res.status(200).json({ message: "Categoría actualizada correctamente", payload: updatedCategory })

        }catch(error){
            next(error)
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const categoryID = req.params.id

            if(!categoryID){
                throw new AppError(
                    "El ID de la categoría es obligatorio.",
                    400
                )
            }

            const deletedCategory = await removeCategory(categoryID)

            if(!deletedCategory){
                throw new AppError(
                    "No se encontró una categoría con ese ID para eliminar.",
                    404
                )
            }

            res.status(200).json({ message: "Categoría eliminada correctamente." })

        }catch(error){
            next(error)
        }
    }
}