interface IRegistro{
    name: string,
    lastName: string,
    email: string,
    password: string
}

interface ILogin{
    email: string,
    password: string
}

export const handleAuth= async (url: string, data: IRegistro | ILogin) => {
    try {
       
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (response.status !== 201 && response.status !== 200) {
            return {
                result,
                success: false
            }
        }

        return {
            result,
            success: true
        }

    } catch (error) {
        return {
            result: { error: "Error de conexión" },
            success: false
        }
    }
}