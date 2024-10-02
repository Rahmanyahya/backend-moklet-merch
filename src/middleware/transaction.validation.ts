import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

const transactionScehma = Joi.object({
    buyer_name: Joi.string().required(),
    qty: Joi.number().required(),
    order_price: Joi.number().required(),
    addres: Joi.string().required(),
    provisience: Joi.string().required(),
    city: Joi.string().required(),
    sizes: Joi.string().required(),
})

const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const validateId = validateIdSchema.validate(req.params)
    const validate = transactionScehma.validate(req.body)
    if (validateId.error) return res.status(400).json({message: validateId.error.details.map(item => item.message)})
    if (validate.error) return res.status(400).json({message: validate.error.details.map(item => item.message)})
    return next()
}

const validateTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    const validateId = validateIdSchema.validate(req.params)
    if (validateId.error) return res.status(400).json({message: validateId.error.details.map(item => item.message)})
    return next()
}

export {validateTransaction,validateTransactionById}