import { NextFunction, Request, Response } from "express"
import { addOrder, getAllOrders, getOrderById, getOrdersByUserId, updateStatus } from "../services/orderService"
import { INewOrder } from "../model/orderModel"
import { AppError } from "../utils/appError"

export class OrderController {
    static async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { status } = req.query
   
            const orders = await getAllOrders(status as string)
            res.status(200).json(orders)

        }catch(error){
            next(error)
        }
    }

    static async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { orderId } = req.params

            if(!orderId){
                throw new AppError(
                    "El ID del pedido es obligatorio.",
                    400
                )
            }

            const order = await getOrderById(orderId)

            if(!order){
                throw new AppError(
                    "No se encontró pedido con ese ID.",
                    404
                )
            }

            res.status(200).json(order)

        }catch(error){
           next(error)
        }
    }

    static async getOrdersByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { userId } = req.params

            if(!userId){
                throw new AppError(
                    "El ID del usuario es obligatorio.",
                    400
                )
            }

            const orders = await getOrdersByUserId(userId)
            res.status(200).json(orders)
            
        }catch(error){
            next(error)
        }
    }

    static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { userId, products, paymentMethod, address, phoneNumber, comment} = req.body

            if(!userId || !products || products.length === 0 || !paymentMethod || !address || !phoneNumber){
                throw new AppError(
                    "Faltan datos obligatorios para crear el pedido.",
                    400
                )
            }

            const newOrder: INewOrder = {
                userId,
                products,
                paymentMethod,
                address,
                phoneNumber,
                comment: comment || "" 
            }

            const createdOrder = await addOrder(newOrder)

            res.status(201).json({ message: "Pedido creado correctamente.", payload: createdOrder })

        }catch(error){
           next(error)
        }
    }

    static async updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { orderId } = req.params
            const { status } = req.body 

            if(!orderId){
                throw new AppError(
                    "El ID del pedido es obligatorio.",
                    400
                )
            }

            if(!status){
                throw new AppError(
                    "El nuevo estado del pedido es obligatorio.",
                    400
                )
            }

            const updatedOrder = await updateStatus(orderId, status)

            if(!updatedOrder){
                throw new AppError(
                    "No se encontró un pedido con ese ID para actualizar.",
                    404
                )
            }

            res.status(200).json({ message: "Estado del pedido actualizado correctamente.", payload: updatedOrder })
            
        }catch(error){
            next(error)
        }
    }
    
}