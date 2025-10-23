const url = import.meta.env.VITE_SERVER_URL + "categorias/"

export const fetchCategory = async () => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Error al obtener las categorías")
        }
        
        return data
        
    } catch (error) {
        return { categories: [] }
    }
}