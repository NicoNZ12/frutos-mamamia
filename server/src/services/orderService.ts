import Order, { INewOrder } from "../model/orderModel";
import User from "../model/userModel";
import Product from "../model/productModel";
import { calculatePrice } from "../utils/calculatePrice";

export const getAllOrders = async (status: string, page: number, limit: number, skip: number) => {

    const filter: {status?: string} = {}

    if(status){
        filter.status = status
    }

    const totalOrders = await Order.countDocuments(filter)

    const orders = await Order.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "name lastName email address phoneNumber")
        .populate("products.productId", "name price")
        .exec()

    return {
        totalOrders: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        page: page,
        limit: limit,
        orders: orders
    };
}

export const getOrderById = async (id: string) => {
    const order = await Order.findById(id).populate("userId", "name lastName email address phoneNumber").populate("products.productId", "name price").lean()
    return order
}

export const getOrdersByUserId= async (id: string) => {
    const orders = await Order.find({ userId: id }).populate("products.productId", "name price").lean()
    return orders
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

        const totalPricePerProduct = calculatePrice(product, item.quantity)
 
        productsInOrder.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            imgUrl: item.imgUrl
        })

        totalPrice += totalPricePerProduct
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