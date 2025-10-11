import Order, { INewOrder } from "../model/orderModel";
import User from "../model/userModel";
import Product from "../model/productModel";

export const getAllOrders = async (status: string) => {

    const filter: {status?: string} = {}

    if(status){
        filter.status = status
    }

    const orders = await Order.find(filter).populate("userId", "name email address phoneNumber").populate("products.productId", "name price")
    return orders
}

export const getOrderById = async (id: string) => {
    const order = await Order.findById(id).populate("userId", "name email address phoneNumber").populate("products.productId", "name price")
    return order
}

export const addOrder = async (order: INewOrder) => {
    // 1. crear el pedido

    let totalPrice = 0
    let productsInOrder = []

    for (const item of order.products){
        const product = await Product.findById(item.productId)

        if(!product){
            return false
        }

        productsInOrder.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity
        })

        totalPrice += product.price * item.quantity
    }

    const newOrder = new Order({
        userId: order.userId,
        products: productsInOrder,
        totalAmount: totalPrice,
        status: "pendiente",
        date: new Date(),
        paymentMethod: order.paymentMethod,
        comment: order.comment
    })


    await newOrder.save()


    // 2. actualizar los datos del usuario (direccion y telefono)
    const user = await User.findById(order.userId)

    if(!user){
        throw new Error("No se encontró un usuario con ese ID.")
    }

    let needsUpdate = false

    if(!user.address || user.address !== order.address){
        user.address = order.address
        needsUpdate = true
    }

    if(!user.phoneNumber || user.phoneNumber !== order.phoneNumber){
        user.phoneNumber = order.phoneNumber
        needsUpdate = true
    }

    if(needsUpdate) await user.save()

    return newOrder
}

export const updateStatus = async (id: string, status: string) => {
    const updatedOrder = await Order.findOneAndUpdate(
        { _id: id },     
        { status },        
        { new: true, runValidators: true }    
    )
    return updatedOrder
}