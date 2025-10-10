import Category from "../model/catageryModel"
import Product, { IProduct } from "../model/productModel"

export const getAllProducts = async (page: number, limit: number) => {
    const products = await Product.aggregate([
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $skip: (page - 1) * limit },
                    { $limit: limit },   
                ]    
            }
        }
    ])

    return {
        totalProducts: products[0].metadata[0] ? products[0].metadata[0].total : 0,
        totatlPages: products[0].metadata[0] ? Math.ceil(products[0].metadata[0].total / limit) : 0,
        page,
        limit,
        products: products[0].data
    }
}

export const getOneProduct = async (id: string) => {
    const product = await Product.findById(id)
    return product 
}

export const getProductsByCategoryName = async (categoryName: string) => {
    const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") }})
    if(!category){
        return []
    }
    const filteredProducts = await Product.find({category: category._id}).populate("category")
    return filteredProducts
}

export const getProductsBySearch = async (search: string) => {
    const regex = new RegExp(
        search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), 'i'
    )

    const products = await Product.find({
        name: { $regex: regex }
    })

    return products
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