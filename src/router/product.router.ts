import Router from "express"
import {addProductController,deleteProductController,getAllProductsByCategoryController,getAllProductsController,updateProductController} from "../controller/product.controller"
import {addProductValidations,deleteProductValidations,getProductByCategoryValidations,updateProductValidations} from "../middleware/product.validation"
import { uploadPaymentImage,uploadProductImage } from "../middleware/upload.photo"
import { verifyJwt } from "../middleware/verifyJWT.middleware"

const router = Router()

// Add product
router.post('/', [uploadProductImage, addProductValidations], addProductController)

// Get all products
router.get('/', getAllProductsController)

// get product by categort
router.get('/filter', [getProductByCategoryValidations], getAllProductsByCategoryController)

// update product 
router.put('/:id', [verifyJwt,uploadPaymentImage, updateProductValidations], updateProductController)

// delete product
router.delete('/:id', [verifyJwt,deleteProductValidations], deleteProductController)


export default router
