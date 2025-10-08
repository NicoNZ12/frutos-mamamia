import { model, Schema, Document } from "mongoose"

export interface ICategory extends Document {
    name: string
}

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoria es obligatorio."],
        minlength: [5, "El nombre debe tener mínimo 5 caracteres."],
        trim: true,
        unique: [true, "El nombre de la categoría debe ser único"]
    }
}, {
    versionKey: false
})

const categoryModel = model<ICategory>("Categoria", categorySchema)

export default categoryModel