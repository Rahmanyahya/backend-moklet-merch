import { Request, Response } from "express"
import { addProductService,deleteProductService,getAllProductsService,getProductByCategoryService,getProductByIdService,getProductByNameService,updateProductService} from "../service/product.service"
import { dataProduct, mainImage } from "../config"
import {deleteImage} from "../utils/errorHandle"


const addProductController = async (req: Request, res: Response) => {
    try {
        const {name, price, description, category, highlight, discount} = req.body

     const isProductExist = await getProductByNameService(name)

     if (isProductExist) {
        deleteImage(req.file?.filename, mainImage)
        return res.status(400).json({message: "Product already exists"})
     }
        
        const newProduct: dataProduct = {
            name, price: Number(price), description, category, highlight, discount: discount == null || discount == '' ? 0 : Number(discount) , photo: String(req.file?.filename)
        }

     const addProduct = await addProductService(newProduct)
     if (!addProduct) {
    deleteImage(req.file?.filename, mainImage)
     return res.status(500).json({message: "Can't add product, something went wrong"})
     }

    return res.status(200).json({message: "Product added successfully"})
       
    } catch (error) {
        return res.status(400).json(error)
    }
}

const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsService()
        if (!products) return res.status(500).json({message: "Can't get all products, something went wrong"})
       return res.status(200).json({message: "Succes get data"})
    } catch (error) {
        return res.status(400).json(error)
    }
}

// Delete Product

const deleteProductController = async (req: Request,res:Response) => {
    try {
        const id = Number(req.params.id)
        const isProductExist = await getProductByIdService(id)
        if (!isProductExist) return res.status(404).json({message: "Product not found"})
        
       const product = await deleteProductService(id)
       deleteImage(isProductExist.photo, mainImage)
       return res.status(200).json({message: "Product Succesfully Deleted"})}
    catch (error) {
        return res.status(400).json(error)
    }
}

// Update product

const getAllProductsByCategoryController = async (req: Request, res: Response) => {
    try {
        const {category} = req.params
        const products = await getProductByCategoryService(category)
        if (products === null) return res.status(404).json({message: "Product not yet avaibel"})
        return res.status(200).json(products)
    }
        catch (error) {
            return res.status(400).json(error)
        }        
}

const updateProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const {name, price, description, category, highlight, discount} = req.body

        const isProductExist = await getProductByIdService(id)
        if (!isProductExist) {
            deleteImage(req.file?.filename, mainImage)
            return res.status(404).json({message: "Product not found"})
        }
        
        const newData: dataProduct = {
            name: name == '' ? isProductExist.product_name : name,
            category: category == '' ? isProductExist.jenis : category ,
            description:  description == '' ? isProductExist.description : description,
            highlight:  highlight == '' ? isProductExist.highlight : highlight,
            discount: discount == '' ? isProductExist.discount :  discount / 100,
            photo: req.file == undefined ? isProductExist.photo : String(req.file.filename),
            price: price == '' ? isProductExist.price : price * 1000,
            
        }

        const updatedProduct = await updateProductService(newData, id)
        if (!updatedProduct) {
            deleteImage(req.file?.filename,mainImage)
            return res.status(500).json({message: "Can't update product, something went wrong"})
        }
        deleteImage(isProductExist.photo,mainImage)
       return res.status(200).json({message: "Product Succesfully Updated"})

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}



export {addProductController,getAllProductsController,updateProductController,deleteProductController, getAllProductsByCategoryController, 
    }