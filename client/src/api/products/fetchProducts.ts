import type { ApiError} from "../../context/ProductContext"

export const fetchProducts = async (query: string, category?: string, page: number = 1, limit: number = 15) => {
    try {
        let requestUrl = import.meta.env.VITE_SERVER_URL + "productos/"
        
        const params = new URLSearchParams()
        
        if (category) {
            params.append('category', category)
        }

        if (query) {
            params.append('name', query)
        }
                
        params.append('page', page.toString())
        params.append('limit', limit.toString())
        
        if (params.toString()) {
            requestUrl += `?${params.toString()}`
        }

        const response = await fetch(requestUrl)
        const data = await response.json()
        
        if(!response.ok){
            throw data as ApiError;
        }
        
        return data
        
    } catch (error) {
        return { products: [] }
    }
}

const url = import.meta.env.VITE_SERVER_URL + "productos/"

export const deleteProduct = async(id: string) => {
    try{
        const response = await fetch(url + id, {
            method: "DELETE",
        })

        const data = await response.json()

        if(!response.ok){
            throw data as ApiError;
        }

        return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const addProduct = async (newProduct: FormData) => {
    try{
        const response = await fetch(url, {
            method: "POST",
            body: newProduct
        })

        const data = await response.json()

        if(!response.ok){
            throw data as ApiError;
        }

        return data

    }catch(error){
        console.error(error)
        throw error
    }
}