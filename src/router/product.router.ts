import Router from "express"
import {addProductController,deleteProductController,getAllProductsByCategoryController,getAllProductsController,updateProductController} from "../controller/product.controller"
import {addProductValidations,deleteProductValidations,getProductByCategoryValidations,updateProductValidations} from "../middleware/product.validation"
import { uploadProductPhoto } from "../middleware/upload.photo"
import { verifyJwt } from "../middleware/verifyJWT.middleware"

const router = Router()

// Add product
router.post('/', [verifyJwt,uploadProductPhoto.single("photo"), addProductValidations], addProductController)

// Get all products
router.get('/', getAllProductsController)

// get product by categort
router.get('/filter', [getProductByCategoryValidations], getAllProductsByCategoryController)

// update product 
router.put('/:id', [verifyJwt,uploadProductPhoto.single("photo"), updateProductValidations], updateProductController)

// delete product
router.delete('/:id', [verifyJwt,deleteProductValidations], deleteProductController)


export default router
