import { NextFunction, Request, Response } from "express"
import { getAllProducts, getOneProduct, removeProduct, saveProduct, updateProduct, getProductsByCategoryName, getProductsBySearch } from "../services/productService"
import { IProduct } from "../model/productModel"
import { uploadToCloudinary } from "../utils/uploadImage"
import { AppError } from "../utils/appError"

export class ProductController {
    static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let { category, page, limit, name } = req.query
            
            const pageNum = parseInt(page as string) || 1
            const limitNum = parseInt(limit as string) || 15

            if (typeof category === "string") {
                const products = await getProductsByCategoryName(category, pageNum, limitNum)
                res.status(200).json(products)
                return
            }

            if(typeof name === "string"){
                const products = await getProductsBySearch(name)
                res.status(200).json(products)
                return
            }

            const products = await getAllProducts(pageNum, limitNum)
            res.status(200).json(products)

        } catch (error) {
            next(error)
        }
    }

    static async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productID = req.params.id

            if (!productID) {
                throw new AppError(
                    "El ID del producto es obligatorio.",
                    400
                )
            }

            const product = await getOneProduct(productID)

            if (!product) {
                throw new AppError(
                    "No se encontró un producto con ese ID.",
                    404
                )
            }

            res.status(200).json(product)

        } catch (error) {
           next(error)
        }

    }

    static async addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description, price, category, type, unitPrice } = req.body
            const image = req.file

            if (!name || !price || !category || !unitPrice) {
                throw new AppError(
                    "Campos obligatorios faltantes.",
                    400
                )
            }

            let imgUrl = ""

            if(image){
                try{
                    const uploadResult = await uploadToCloudinary(image.buffer, "frutos-mamamia")
                    imgUrl = uploadResult.secure_url
                }catch(uploadResult){
                    throw new AppError(
                        "Error al subir la imagen.",
                        500
                    )
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
            next(error)
        }
    }

    static async editProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productID = req.params.id
            const image = req.file

            if (!productID) {
                throw new AppError(
                    "El ID del producto es obligatorio.",
                    400
                )
            }
            
            if (Object.keys(req.body).length === 0 && !image) {
                throw new AppError(
                    "Debes enviar al menos un campo para actualizar.",
                    400
                )
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
                    throw new AppError(
                        "Error al subir la imagen.",
                        500
                    )
                }
            }

            const updatedProduct = await updateProduct(productID, updateData)

            if (!updatedProduct) {
                throw new AppError(
                    "No se encontró un producto con ese ID para actualizar.",
                    404
                )
            }

            res.status(200).json({ message: "Producto actualizado correctamente", payload: updatedProduct })

        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productID = req.params.id

            if (!productID) {
                throw new AppError(
                    "El ID del producto es obligatorio.",
                    400
                )
            }

            const deletedProduct = await removeProduct(productID)

            if (!deletedProduct) {
                throw new AppError(
                    "No se encontró un producto con ese ID para actualizar.",
                    404
                )
            }

            res.status(200).json({ message: "Producto eliminado correctamente." })

        } catch (error) {
            next(error)
        }
    }
}