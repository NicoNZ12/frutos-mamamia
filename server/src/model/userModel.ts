import { Document, Model, model, Schema } from "mongoose";
import { hash, genSalt, compare } from "bcrypt";

export interface IUser extends Document {
    name: string,
    lastName: string,
    email: string,
    password: string,
    address?: string,
    phoneNumber?: string,
    isAdmin: boolean
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio."],
        minlength: [3, "El nombre debe tener mínimo 3 caracteres."],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio."],
        minlength: [3, "El apellido debe tener mínimo 3 caracteres."],
        trim: true
    },  
    email: {
        type: String,
        required: [true, "El email es obligatorio."],
        trim: true,
        unique: [true, "El email debe ser único"],
        match: [/.+\@.+\..+/, "El email debe ser válido."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minlength: [6, "La contraseña debe tener mínimo 6 caracteres."]
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
})

interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>
}

userSchema.statics.hashPassword = async function(password: string): Promise<string> {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}

userSchema.methods.comparePassword = async function(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await compare(password, hashedPassword)
    return isMatch
}

const userModel = model<IUser, IUserModel>("Usuario", userSchema)
export default userModel