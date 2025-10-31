import Cookies from "js-cookie"

const token = Cookies.get("token")
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