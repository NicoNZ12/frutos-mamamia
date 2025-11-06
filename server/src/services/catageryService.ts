import Category, { ICategory } from '../model/catageryModel'

export const getAllCategories = async () => {
    const categories = await Category.find()
    return categories
}

export const getOneCategory = async (id: string) => {
    const category = await Category.findById(id)
    return category 
}

export const saveCategory = async (category: ICategory) => {
    const newCategory = new Category(category)
    await newCategory.save()
    return newCategory
}

export const updateCategory = async (id: string, name: string) => {
    const updatedCategory = await Category.findOneAndUpdate(
        { _id: id },     
        { name },        
        { new: true }    
    )
    return updatedCategory
}

export const removeCategory = async (id: string) => {
    const deletedCategory = await Category.findByIdAndDelete(id)
    return deletedCategory
}