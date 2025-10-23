import { Request, Response } from "express"
import { getAllProducts, getOneProduct, removeProduct, saveProduct, updateProduct, getProductsByCategoryName, getProductsBySearch } from "../services/productService"
import { IProduct } from "../model/productModel"
import { uploadToCloudinary } from "../utils/uploadImage"

export class ProductController {
    static async getProducts(req: Request, res: Response): Promise<void> {
        try {
            let { category, page, limit } = req.query
            
            const pageNum = parseInt(page as string) || 1
            const limitNum = parseInt(limit as string) || 15

            if (typeof category === "string") {
                const products = await getProductsByCategoryName(category, pageNum, limitNum)
                res.status(200).json(products)
                return
            }

            const products = await getAllProducts(pageNum, limitNum)
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

    static async searchProducts(req: Request, res: Response): Promise<void> {
        try{
            const { q } = req.query

            if(!q){
                res.status(400).json({ message: "El parámetro de búsqueda 'q' es obligatorio." })
                return
            }

            const products = await getProductsBySearch(q as string)
            res.status(200).json(products)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al buscar productos.", error: err.message })
        }
    }

    static async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, price, category, type, unitPrice } = req.body
            const image = req.file

            if (!name || !price || !category || !unitPrice) {
                res.status(400).json({ message: "Campos obligatorios faltantes." })
                return
            }

            let imgUrl = ""

            if(image){
                try{
                    const uploadResult = await uploadToCloudinary(image.buffer, "frutos-mamamia")
                    imgUrl = uploadResult.secure_url
                }catch(uploadResult){
                    res.status(500).json({ message: "Error al subir la imagen" })
                    return
                }
            }

            let quantityStep = 0

            if(unitPrice === "kg" || unitPrice === "gr"){
                quantityStep = 25
            }else{
                quantityStep = 1
            }


            const newProduct = {
                name: name.toUpperCase(),
                description,
                price,
                category,
                type: type || "simple",
                unitPrice,
                quantityStep,
                imgUrl: imgUrl || ""
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
            const image = req.file

            if (!productID) {
                res.status(400).json({ message: "El ID del producto es obligatorio." })
                return
            }
            
            if (Object.keys(req.body).length === 0 && !image) {
                res.status(400).json({ message: "Debes enviar al menos un campo para actualizar." })
                return
            }

            const updateData = {
                ...req.body,
            }

            if (updateData.name) {
                updateData.name = updateData.name.toUpperCase()
            }

            if(image){
                try{
                    const uploadResult = await uploadToCloudinary(image.buffer, "frutos-mamamia")
                    updateData.imgUrl = uploadResult.secure_url

                }catch(uploadError){
                    res.status(500).json({ message: "Error al subir la imagen" })
                    return 
                }
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