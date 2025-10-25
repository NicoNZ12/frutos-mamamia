const url = import.meta.env.VITE_SERVER_URL + "usuarios/"

export const fetchUser = async (id: string) => {
    try {
        const response = await fetch(url + id)
        const data = await response.json()
        
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Error al obtener el usuario")
        }
        
        return data
        
    } catch (error) {
        return {error: error}
    }
}