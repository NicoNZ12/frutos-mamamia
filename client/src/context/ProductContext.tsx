import { createContext, useContext, useEffect, useState } from "react";
import { addProduct, deleteProduct, fetchProducts } from "../api/products/fetchProducts";
import { fetchCategory } from "../api/products/fetchCategory";
import toast from "react-hot-toast";

interface IProductContext {
  products: IProduct[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  pagination: PaginationData;
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  categories: ICategory[];
  searchQuery: string; 
  setSearchQuery: (query: string) => void;
  debouncedQuery: string;
  handleDeleteProduct: (id: string) => void;
  handleAddProduct: (newProduct: newProduct, imageFile: File) => boolean | Promise<boolean>;
}

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imgUrl?: string;
  unitPrice: string;
  category: string
}

export type newProduct = Omit<IProduct, "_id">

interface ICategory {
  _id: string
  name: string
}

interface PaginationData {
  page: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  error?: string; 
}

const productContext = createContext<IProductContext | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchQuery]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(debouncedQuery, selectedCategory, currentPage, 15);
        setProducts(data.products || data);
        setPagination({
          page: data.page || 1,
          totalPages: data.totalPages || 1,
        });
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory, currentPage, debouncedQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedQuery]);

  useEffect(() => {
    const getCategories = async () => {
        const data = await fetchCategory()
        setCategories(data)
    }
  
    getCategories()
  }, [])

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
      const apiError = error as ApiError;

      const errorMessage = apiError.error || apiError.message

      toast.error(errorMessage)

      } else {
        toast.error("Error de red o inesperado. Intente de nuevo.")
      }
    }
  }

  const handleAddProduct = async (newProduct: newProduct, imageFile: File | null) => {
    const data = new FormData();

    data.append('name', newProduct.name);
    data.append('price', String(newProduct.price)); 
    data.append('category', newProduct.category);
    data.append('unitPrice', newProduct.unitPrice);
    
    if (newProduct.description) {
      data.append('description', newProduct.description);
    }
    
    if (imageFile) {
      data.append('image', imageFile); 
    }

    try{
      await addProduct(data)
      toast.success("Producto agregado exitosamente")
      return true

    }catch(error){
      if (error && typeof error === 'object' && 'message' in error) {
      const apiError = error as ApiError;

      const errorMessage = apiError.error || apiError.message

      toast.error(errorMessage)

      } else {
        toast.error("Error de red o inesperado. Intente de nuevo.")
      }

      return false
    }
  }

  const value = {
    products,
    selectedCategory,
    setSelectedCategory,
    pagination,
    loading,
    currentPage,
    setCurrentPage,
    categories,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    handleDeleteProduct,
    handleAddProduct
  };

  return (
    <productContext.Provider value={value}>
      {children}
    </productContext.Provider>
  );
};

export const useProduct = () => {
    const context = useContext(productContext)
    if (!context) {
        throw new Error('useProduct debe usarse dentro de un productProvider')
    }
    return context
}
