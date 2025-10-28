import { model, ObjectId, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string,
    description?: string,
    price: number,
    category: ObjectId,
    type: string
    imgUrl?: string
    unitPrice: string
    quantityStep: number
}

const productoSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio."],
        minlength: [3, "El nombre debe tener mínimo 3 caracteres."],
        trim: true,
        unique: [true, "El nombre del producto debe ser único"]
    },
    description: {
        type: String,
        minlength: [10, "La descripción debe tener mínimo 10 caracteres."],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "El precio del producto es obligatorio."],
        min: [0, "El precio no puede ser negativo."]
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: "Categoria", 
        required: [true, "La categoría del producto es obligatoria."]
    },
    type: {
        type: String,
        enum: ["simple", "promocion"],
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    unitPrice: {
        type: String,
        required: [true, "La unidad por precio es obligatoria."],
        enum: ["kg", "gr", "un", "lt"]
    },
    quantityStep: {
        type: Number,
        enum: [25, 1],
        required: true
    }
}, {
    versionKey: false
})

productoSchema.index({ name: "text" }, { default_language: "spanish" })

const productoModel = model<IProduct>("Producto", productoSchema)

export default productoModel