import { Request, Response } from "express"
import { getAllProducts, getOneProduct, removeProduct, saveProduct, updateProduct, getProductsByCategoryName } from "../services/productService"
import { IProduct } from "../model/productModel"

export class ProductController {
    static async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const { category } = req.query           

            let products: IProduct[] = []

            if (typeof category === "string") {
                products = await getProductsByCategoryName(category)
                res.status(200).json(products)
                return
            }

            products = await getAllProducts()
            res.status(200).json(products)

        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: "Error al obtener los productos.", error: err.message })
        }
    }

    static async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const productID = req.params.id

            if (!productID) {
                res.status(400).json({ message: "El ID del producto es obligatorio." })
                return
            }

            const product = await getOneProduct(productID)

            if (!product) {
                res.status(404).json({ message: "No se encontró un producto con ese ID" })
                return
            }

            res.status(200).json(product)

        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: "Error al obtener el producto.", error: err.message })
        }

    }

    static async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, price, category, type, imgUrl } = req.body

            if (!name || !price || !category) {
                res.status(400).json({ message: "Campos obligatorios faltantes." })
                return
            }

            const newProduct = {
                name: name.toUpperCase(),
                description,
                price,
                category,
                type,
                imgUrl
            }

            const savedProduct = await saveProduct(newProduct as IProduct)

            res.status(201).json({ message: "producto creado correctamente.", payload: savedProduct })

        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: "Error al añadir un producto.", error: err.message })
        }
    }

    static async editProduct(req: Request, res: Response): Promise<void> {
        try {
            const productID = req.params.id

            if (!productID) {
                res.status(400).json({ message: "El ID del producto es obligatorio." })
                return
            }
            
            if (Object.keys(req.body).length === 0) {
                res.status(400).json({ message: "Debes enviar al menos un campo para actualizar." })
                return
            }

            const updateData = {
                ...req.body,
            }

            if (updateData.name) {
                updateData.name = updateData.name.toUpperCase()
            }

            const updatedProduct = await updateProduct(productID, updateData)

            if (!updatedProduct) {
                res.status(404).json({ message: "No se encontró un producto con ese ID para actualizar." })
                return
            }

            res.status(200).json({ message: "Producto actualizado correctamente", payload: updatedProduct })

        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: "Error al actualizar un producto.", error: err.message })
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productID = req.params.id

            if (!productID) {
                res.status(400).json({ message: "El ID del producto es obligatorio." })
                return
            }

            const deletedProduct = await removeProduct(productID)

            if (!deletedProduct) {
                res.status(404).json({ message: "No se encontró un producto con ese ID para eliminar." })
                return
            }

            res.status(200).json({ message: "Producto eliminado correctamente." })

        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: "Error al eliminar un producto.", error: err.message })
        }
    }
}