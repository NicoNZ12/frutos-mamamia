import {Request, Response} from 'express'
import { getAllCategories, getOneCategory, removeCategory, saveCategory, updateCategory } from '../services/catageryService'
import { ICategory } from '../model/catageryModel'

export class Category {
    static async getCategories(_req: Request, res: Response): Promise<void> {
        try{
            const categories = await getAllCategories()
            res.status(200).json(categories)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener las categorías.", error: err.message })
        }

    }

    static async getCategory(req: Request, res: Response): Promise<void> {
        try{
            const categoryID = req.params.id

            if(!categoryID){
                res.status(400).json({ message: "El ID de la categoría es obligatorio." })
                return
            }

            const category = await getOneCategory(categoryID)

            if(!category){
                res.status(404).json({ message: "No se encontró una categoría con ese ID" })
                return
            }

            res.status(200).json(category)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener la categoría.", error: err.message })
        }

    }

    static async addCategory(req: Request, res: Response): Promise<void> {
        try{
            const { name } = req.body

            if(!name){
                res.status(400).json({ message: "El nombre de la categoría es obligatorio." })
                return
            }

            const newCategory = {
                name
            } 

            const savedCategory = await saveCategory(newCategory as ICategory)

            res.status(201).json({ message: "Categoría creada correctamente.", payload: savedCategory })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al crear una categoría.", error: err.message })
        }
    }

    static async editCategory(req: Request, res: Response): Promise<void> {
        try{
            const categoryID = req.params.id
            const { name } = req.body

            if(!categoryID){
                res.status(400).json({ message: "El ID de la categoría es obligatorio." })
                return
            }

            if(!name){
                res.status(400).json({ message: "El nombre de la categoría es obligatorio." })
                return
            }

            const updatedCategory = await updateCategory(categoryID, name)

            if(!updatedCategory){
                res.status(404).json({ message: "No se encontró una categoría con ese ID para actualizar." })
                return
            }

            res.status(200).json({ message: "Categoría actualizada correctamente", payload: updatedCategory })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al actualizar una categoría.", error: err.message })
        }
    }

    static async deleteCategory(req: Request, res: Response): Promise<void> {
        try{
            const categoryID = req.params.id

            if(!categoryID){
                res.status(400).json({ message: "El ID de la categoría es obligatorio." })
                return
            }

            const deletedCategory = await removeCategory(categoryID)

            if(!deletedCategory){
                res.status(404).json({ message: "No se encontró una categoría con ese ID para eliminar." })
                return
            }

            res.status(200).json({ message: "Categoría eliminada correctamente." })

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al eliminar una categoría.", error: err.message })
        }
    }
}