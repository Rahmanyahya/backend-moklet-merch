import { dataProduct } from "../config"
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductByCategory, getProductByName, getProductById} from "../repository/product.repository"

const addProductService = async (dataProduct: dataProduct) => {
  const newProduct: dataProduct = {
    name: dataProduct.name,
    price: dataProduct.price * 1000,
    description: dataProduct.description,
    category: dataProduct.category,
    highlight: dataProduct.highlight,
    photo: dataProduct.photo,
    discount: dataProduct.discount == 0 ? 0  : (Number(dataProduct.discount) / 100)
  } 
  return await addProduct(newProduct)
}

const updateProductService = async (newDataProduct: dataProduct, id: number) => {
    return await updateProduct(newDataProduct, id) 
}

const deleteProductService = async (id: number) => {
    return await deleteProduct(id)
}

const getAllProductsService = async () => {
    const dataFromDbProduct = await getAllProducts()
   return dataFromDbProduct ? "No product avaible" : dataFromDbProduct
}

const getProductByCategoryService = async (category: any) => {
    const dataFromDbProduct = await getProductByCategory(category)
   return dataFromDbProduct ? "No product avaible" : dataFromDbProduct
}

const getProductByNameService = async (name: string) => {
    return await getProductByName(name)
}

const getProductByIdService = async (id: number) => {
    return await getProductById(id)
}


export {addProductService, updateProductService, deleteProductService, getAllProductsService, getProductByCategoryService,getProductByNameService,getProductByIdService}