import type { ApiError } from "../../context/ProductContext";

const url = import.meta.env.VITE_SERVER_URL + "categorias/"

export const fetchCategory = async () => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        
        if(!response.ok){
            throw data as ApiError;
        }
        
        return data
        
    } catch (error) {
        return { categories: [] }
    }
}