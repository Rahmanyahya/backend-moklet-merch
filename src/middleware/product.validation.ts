import { NextFunction, Response, Request } from "express";
import Joi from "joi";
import { deleteImage } from "../utils/errorHandle";
import { mainImage } from "../config";

const idProduct = Joi.object({
    id: Joi.number().min(1).required()
})

const addProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().valid("Tshirt","Jersey","Long_Sleve", "Jacket", "Hat", "Belt", "Syal", "Bracelet").required(),
    highlight: Joi.string().required(),
    discount: Joi.number().min(0).max(100).optional().allow('')
})

const addProductValidations = (req: Request, res: Response, next:NextFunction) => {
   const validate = addProductSchema.validate(req.body)
   if (req.file == undefined) return res.status(400).json({Message: "Please upload foto for your product"})
   if (validate.error) {
       deleteImage(req.file?.filename, mainImage)
       return res.status(400).json({error: validate.error.details.map(item => item.message)})
   }
   return next()
}

const updateProductSchema = Joi.object({
    name: Joi.string().optional().allow(''),
    price: Joi.number().allow(''),
    description: Joi.string().optional().allow(''),
    category: Joi.string().valid("Tshirt","Jersey","Long_Sleve", "Jacket", "Hat", "Belt", "Syal", "Bracelet").optional().allow(''),
    highlight: Joi.string().optional().allow(''),
    discount: Joi.number().optional().allow('')
}).unknown()

const updateProductValidations = (req: Request, res: Response, next: NextFunction) => {
    const validateId = idProduct.validate(req.params)
    const validate = updateProductSchema.validate(req.body)
    if (validateId.error) {
        if (req.file != undefined) deleteImage(req.file?.filename, mainImage)
        return res.status(400).json({error: validateId.error.details.map(item => item.message)})
    }

    if (validate.error) {
        if (req.file != undefined) deleteImage(req.file?.filename, mainImage)
        return res.status(400).json({error: validate.error.details.map(item => item.message)})
    }
    return next()
}

const deleteProductValidations = (req: Request, res: Response, next: NextFunction) => {
    const validate = idProduct.validate(req.params)
    if (validate.error) {
        return res.status(400).json({error: validate.error.details.map(item => item.message)})
    }
    return next()
}

const getProductByCategorySchema = Joi.object({
    category: Joi.string().valid("Tshirt","Jersey","Long_Sleve", "Jacket", "Hat", "Belt", "Syal", "Bracelet").required()
})

const getProductByCategoryValidations = (req: Request, res: Response, next: NextFunction) => {
    const validate = getProductByCategorySchema.validate(req.query)
    if (validate.error) {
        return res.status(400).json({error: validate.error.details.map(item => item.message)})
    }
    return next()
}

export {addProductValidations, deleteProductValidations, updateProductValidations, getProductByCategoryValidations}