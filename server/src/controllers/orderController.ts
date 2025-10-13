import { Request, Response } from "express"
import { addOrder, getAllOrders, getOrderById, getOrdersByUserId, updateStatus } from "../services/orderService"
import { INewOrder } from "../model/orderModel"

export class OrderController {
    static async getOrders(req: Request, res: Response): Promise<void> {
        try{
            const { status } = req.query
   
            const orders = await getAllOrders(status as string)
            res.status(200).json(orders)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener los pedidos.", error: err.message })
        }
    }

    static async getOrder(req: Request, res: Response): Promise<void> {
        try{
            const { orderId } = req.params
            console.log(orderId)

            if(!orderId){
                res.status(400).json({ message: "El ID del pedido es obligatorio." })
                return
            }

            const order = await getOrderById(orderId)

            if(!order){
                res.status(404).json({ message: "No se encontró pedido con ese ID." })
                return
            }

            res.status(200).json(order)

        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener el pedido.", error: err.message })
        }
    }

    static async getOrdersByUser(req: Request, res: Response): Promise<void> {
        try{
            const { userId } = req.params

            if(!userId){
                res.status(400).json({ message: "El ID del usuario es obligatorio." })
                return
            }

            const orders = await getOrdersByUserId(userId)
            res.status(200).json(orders)
            
        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al obtener los pedidos del usuario.", error: err.message })
        }
    }

    static async createOrder(req: Request, res: Response): Promise<void> {
        try{
            const { userId, products, paymentMethod, address, phoneNumber, comment} = req.body

            if(!userId || !products || products.length === 0 || !paymentMethod || !address || !phoneNumber){
                res.status(400).json({ message: "Faltan datos obligatorios para crear el pedido."})
                return
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
            const err = error as Error
            res.status(500).json({ message: "Error al crear el pedido.", error: err.message})
        }
    }

    static async updateOrderStatus(req: Request, res: Response): Promise<void> {
        try{
            const { orderId } = req.params
            const { status } = req.body 

            if(!orderId){
                res.status(400).json({ message: "El ID del pedido es obligatorio." })
                return
            }

            if(!status){
                res.status(400).json({ message: "El nuevo estado del pedido es obligatorio." })
                return
            }

            const updatedOrder = await updateStatus(orderId, status)

            if(!updatedOrder){
                res.status(404).json({ message: "No se encontró un pedido con ese ID para actualizar." })
                return
            }

            res.status(200).json({ message: "Estado del pedido actualizado correctamente.", payload: updatedOrder })
            
        }catch(error){
            const err = error as Error
            res.status(500).json({ message: "Error al actualizar el estado del pedido.", error: err.message })
        }
    }
    
}