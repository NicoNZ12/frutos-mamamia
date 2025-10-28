import CategoryCard from "./CategoryCard"
import { useEffect, useState } from "react"
import { fetchCategory } from "../../api/products/fetchCategory"
import { useProduct } from "../../context/ProductContext"

interface ICategory {
  _id: string
  name: string
}

interface CategoryListProps {
  selectedCategory?: string
  onCategorySelect: (category: string) => void
}

const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  const {categories} = useProduct()

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500/80">No hay categorías disponibles</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {categories.map(category => (
          <CategoryCard 
            key={category._id}
            categoryName={category.name}
            isSelected={selectedCategory === category.name}
            onClick={() => {
              if (selectedCategory === category.name) {
                onCategorySelect("")
              } else {
                onCategorySelect(category.name)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryList