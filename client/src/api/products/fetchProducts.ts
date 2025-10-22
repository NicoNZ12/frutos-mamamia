export const fetchProducts = async (category?: string) => {
    try {
        let requestUrl = import.meta.env.VITE_SERVER_URL + "productos/"
        
        if (category) {
            requestUrl += `?category=${encodeURIComponent(category)}`
        }

        const response = await fetch(requestUrl)
        const data = await response.json()
        
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Error al obtener los productos")
        }
        
        return data
        
    } catch (error) {
        return { products: [] }
    }
}