import Category from "../model/catageryModel"

export const loadCategories = async () => {
    try {
        const existingCategories = await Category.find()

        if (existingCategories) {
            console.log("Las categorías ya están cargadas.")
            return
        }

        const categories = [
            { name: "MIX DE FRUTAS" },
            { name: "CONDIMENTOS Y ESPECIAS" },
            { name: "HARINAS" },
            { name: "FRUTOS SECOS" },
            { name: "DESHIDRATADOS" },
            { name: "CEREALES Y SEMILLAS" },
            { name: "ENDULZANTES" },
            { name: "VARIOS" },
            { name: "HIERBAS E INFUSIONES" },
            { name: "LECHES VEGETALES" },
            { name: "LEGUMBRES" },
            { name: "CONFITURAS" }
        ]

        await Category.insertMany(categories)
        console.log("Categorías cargadas correctamente.")

    } catch (error) {
        console.error("Error al cargar categorías:", error)
    }
}