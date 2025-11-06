import { model, ObjectId, Schema } from "mongoose";


export interface INewOrder {
    userId: string,
    products: { 
        productId: string,
        name: string,
        quantity: number,
        price: number,
        imgUrl: string
    }[],
    paymentMethod: string,
    address: string,
    phoneNumber: string,
    comment?: string,
}

export interface IOrder extends Document {
    userId: ObjectId,
    products: {
        productId: ObjectId,
        quantity: number,
        price: number,
    }[],
    totalAmount: number,
    status: string,
    date: Date,
    comment?: string,
    paymentMethod: string
}
   
const orderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',  
        required: true 
    },
    products: [{
        productId: { 
            type: Schema.Types.ObjectId,
            ref: 'Producto', 
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        imgUrl: {
            type: String
        }
    }],
    totalAmount: {  
        type: Number,
        required: true,
        min: 0
    },
    status: { 
        type: String,
        enum: ['pendiente', 'proceso', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        maxlength: 500
    },
    paymentMethod: {
        type: String,
        enum: ['transferencia', 'efectivo'],
        required: true
    }

}, {
    versionKey: false,
})

const orderModel = model<IOrder>("Order", orderSchema)

export default orderModel