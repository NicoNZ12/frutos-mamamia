import React, { useEffect, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link, useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProduct } from '../../context/ProductContext';

export interface IProductFormData {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  unitPrice: string;
  category: string;
  imgUrl?: string;
}

interface IProductFormProps {
  product?: IProductFormData
  mode: "add" | "edit"
}

const ProductForm = ({product, mode}: IProductFormProps) => {
  const [formData, setFormData] = useState<IProductFormData>({
    name: product?.name || '',
    description: product?.description,
    price: product?.price || 0,
    unitPrice: product?.unitPrice|| '',
    category: product?.category || '',
    imgUrl: product?.imgUrl,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imgUrl || null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setLoading] = useState(false)
  const { categories, handleAddProduct, handleEditProduct } = useProduct()

  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageFile(null)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      unitPrice: '',
      category: '',
      imgUrl: '',
    });

    setImagePreview(null)
    setImageFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try{
      if(mode === "add"){  
        const isProductAdded = await handleAddProduct(formData, imageFile!);

        if(isProductAdded){
          resetForm()
          navigate('/admin')
        }
            
      } else {
        console.log("Editar producto:", formData);
        const isProductEdited = await handleEditProduct(product!._id!, formData, imageFile!)

        if(isProductEdited){
          resetForm()
          navigate('/admin')
        }
      }

    }catch(error){
      console.error("Error al enviar el formulario:", error)
    }finally{
      setLoading(false)
    }

  }

  useEffect(() => {
    if(product){
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        unitPrice: product.unitPrice,
        category: product.category,
        imgUrl: product.imgUrl,
      })
      
      if (product.imgUrl) {
        setImagePreview(product.imgUrl)
      }
    }
  }, [product])

  return (
    <div className="bg-secondary-50 p-4 md:p-8 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          

          <div className="lg:w-2/3 flex flex-col gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-100">
              <h2 className="text-xl font-semibold text-secondary-500/80 mb-6">
                Información del Producto
              </h2>
              
              <div className="space-y-4">

                {/* Nombre  */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-secondary-500/80 mb-1"
                  >
                    Nombre del Producto <span className='text-red-600'>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Almendras Premium"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label 
                    htmlFor="description" 
                    className="block text-sm font-medium text-secondary-500/80 mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe el producto en detalle..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400"
                  />
                </div>

                {/* Fila de Precio y unidad */}
                <div className="flex flex-col md:flex-row gap-4">

                  {/* Precio */}
                  <div className="md:w-1/2">
                    <label 
                      htmlFor="price" 
                      className="block text-sm font-medium text-secondary-500/80 mb-1"
                    >
                      Precio ($) <span className='text-red-600'>*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Unidad */}
                  <div className="md:w-1/2">
                    <label 
                      htmlFor="unitPrice" 
                      className="block text-sm font-medium text-secondary-500/80 mb-1"
                    >
                      Unidad por precio <span className='text-red-600'>*</span>
                    </label>
                    <select
                        id="unitPrice"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                    >
                        <option value="">Selecciona una unidad</option>
                        <option value="un">Unidad (un)</option>
                        <option value="kg">Kilo (Kg)</option>
                        <option value="gr">Gramo (100gr)</option>
                        <option value="lt">Litro (lt)</option>
                    </select>
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label 
                    htmlFor="category" 
                    className="block text-sm font-medium text-secondary-500/80 mb-1"
                  >
                    Categoría <span className='text-red-600'>*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                  >
                    <option value="">Selecciona una categoría</option>
                    {
                        categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                    }
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-start gap-4">
              <button
                type="submit"
                className="bg-primary text-white font-medium py-2 px-6 rounded-md shadow-sm hover:bg-primary-600 transition duration-150 cursor-pointer"
              >
                {isLoading ? ( <CircularProgress color="inherit" size={24} /> ) : ( mode === "add" ? "Añadir Producto" : "Guardar Cambios" )}
              </button>
              <Link
                to="/admin"
                className="bg-transparent text-secondary-500/80 font-medium py-2 px-6 rounded-md hover:bg-secondary-100  transition duration-150 border border-gray-300 cursor-pointer"
              >
                Cancelar
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-100">
              <h2 className="text-xl font-semibold text-secondary-500/80 mb-6">
                Imagen del Producto
              </h2>
              
              <div className="flex justify-center items-center w-full">
                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                    <img
                      src={imagePreview}
                      alt="Vista previa del producto"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage} 
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-0.5 w-7 h-7 flex items-center justify-center text-lg font-bold shadow-md hover:bg-red-700 cursor-pointer"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (

                  <label 
                    htmlFor="file-upload" 
                    className="flex flex-col justify-center items-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary-50 hover:bg-secondary-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadFileIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-secondary-500/80">
                        <span className="font-semibold">Subir imagen</span>
                      </p>
                      <p className="text-xs text-secondary-400">
                        haz click
                      </p>
                    </div>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageChange} 
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                )}
    
              </div>
              <p className="text-xs text-secondary-400 mt-2">
                Formatos aceptados: JPG, PNG, WEBP. Tamaño máximo: 5MB
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;