import { IProduct } from "../model/productModel"

export const calculatePrice = (product: IProduct, quantity: number): number => {
    const { price, unitPrice } = product

    //precio base para productos de kg o 100gr o de unidad / litro
    let basePricePerUnit = 0

    if(unitPrice === "un" || unitPrice === "lt"){
        basePricePerUnit = price

    } else if(unitPrice === "kg"){
        basePricePerUnit = price / 1000

    } else if(unitPrice === "gr"){
        //para productos donde el precio es por 100gr
        basePricePerUnit = price //por el momento solo se puede comprar de a 100gr
    }

    const totalPrice = basePricePerUnit * quantity

    return totalPrice
}