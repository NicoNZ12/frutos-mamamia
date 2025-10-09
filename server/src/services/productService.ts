import Product, { IProduct } from "../model/productModel"

export const getAllProducts = async () => {
    const products = await Product.find()
    return products
}

export const getOneProduct = async (id: string) => {
    const product = await Product.findById(id)
    return product 
}

export const saveProduct = async (product: IProduct) => {
    const newProduct = new Product(product)
    await newProduct.save()
    return newProduct
}

export const updateProduct = async (id: string, productUpdate: Partial<IProduct>) => {
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },     
        productUpdate,        
        { new: true, runValidators: true }    
    )
    return updatedProduct
}

export const removeProduct = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id)
    return deletedProduct
}