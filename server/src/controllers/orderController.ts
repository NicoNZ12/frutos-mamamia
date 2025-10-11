import { Request, Response } from "express"
import { addOrder, getAllOrders, getOrderById } from "../services/orderService"
import { INewOrder } from "../model/orderModel"

export class OrderController {
    static async getOrders(_req: Request, res: Response): Promise<void> {
        try{
            const orders = await getAllOrders()
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
}