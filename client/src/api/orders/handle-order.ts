import Cookies from "js-cookie"
import type { ApiError } from "../../context/ProductContext"

interface IProduct {
    productId: string,
    name: string,
    price: number,
    quantity: number
}

interface IOrder {
    userId: string,
    address: string,
    phoneNumber: string,
    paymentMethod: string,
    comment: string,
    products: IProduct[]
}

const url = import.meta.env.VITE_SERVER_URL + "pedidos/"

export const handleOrder = async (order: IOrder) => {
    const token = Cookies.get("token")
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(order)
        })

        const data = await response.json()

        if (response.status !== 201 && response.status !== 200) {
            return {
                data,
                success: false
            }
        }

        return {
            data,
            success: true
        }

    }catch(error){
        return {
            result: { error: "Error de conexión" },
            success: false
        }
    }
}

export const getOrders = async () => {
    const token = Cookies.get("token")
    try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()

        if(!response.ok){
            throw data as ApiError
        }
                
        return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const getOrderById = async (orderId: string) => {
    const token = Cookies.get("token")
    try{
        const response = await fetch(url + orderId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()

        if(!response.ok){
            throw data as ApiError
        }
                
        return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    const token = Cookies.get("token")
    try{
        const response = await fetch(url + orderId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        })
        const data = await response.json()

        if(!response.ok){
            throw data as ApiError
        }
                
        return data
    }catch(error){
        console.error(error)
        throw error
    }
}