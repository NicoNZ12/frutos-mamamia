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
        
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Error al obtener los productos")
        }
        
        return data
        
    } catch (error) {
        return { products: [] }
    }
}