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

export const fetchUsers = async (query: string, page: number = 1, limit: number = 10) =>  {
    try {
        let requestUrl = import.meta.env.VITE_SERVER_URL + "usuarios/"

        const params = new URLSearchParams()
        
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
            throw new Error("Error al obtener el usuario")
        }
        
        return data
        
    } catch (error) {
        return {users: []}
    }
}