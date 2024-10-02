import { Request, Response } from "express";
import { getProductById } from "../repository/product.repository";
import { addTransactionService, changeStatusService, deleteTransactionService, getAllTransactionService } from "../service/transaction.service";
import { paymentImage, transaction } from "../config";
import { deleteProductService } from "../service/product.service";
import { deleteImage } from "../utils/errorHandle";
import { getTransactionById } from "../repository/transaction.repository";

const addTransactionController = async (req: Request, res: Response) => {
   try {
    const product_id = Number(req.params.product)
    const {buyer_name,qty,order_price,photo,sizes} = req.body
 
    const validateProduct = await getProductById(product_id)

    if (!validateProduct) {
        deleteImage(req.file?.filename, paymentImage)
        return res.status(404).json({message: "Product is not exist"})
    } 

    const dataTransactionUser: transaction = {
        product_id,
        buyer_name,
        photo,
        qty,
        order_price,
        sizes
    }
    
    const addTransaction = await addTransactionService(dataTransactionUser)

    return res.status(200).json({message: "Transaction success", transaction: addTransaction.id})

   } catch (error) {
        return res.status(400).json(error)    
   }

}

const getAllTransactionController = async (req: Request, res: Response) => {
    try {
        const transactions = await getAllTransactionService()
        return res.status(200).json({message: "Succes get data", transactions })
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteTransactionController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const validateId = await getTransactionById(id)
        if(!validateId) return res.status(404).json({message: "Product not found"})
        const photo = validateId.photo
        const deleteTransaction = await deleteTransactionService(id)
        deleteImage(photo, paymentImage)
        return res.status(200).json({message: "Transaction has been deleted", })
    } catch (error) {
        return res.status(400).json(error)
    }
}

const changeStatusController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const changeStatus = await changeStatusService(id)
        return res.status(200).json({message: "Order Aproved"})
    } catch (error) {
        return res.status(400).json(error)
    }
}


export {addTransactionController, getAllTransactionController, deleteTransactionController, changeStatusController}