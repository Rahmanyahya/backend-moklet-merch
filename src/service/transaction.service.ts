import { transaction } from "../config"
import { addTransaction, changeStatus, deleteTransaction, getAllTransaction, getTransactionById } from "../repository/transaction.repository"

const addTransactionService = async (data: transaction) => {
    const newData: transaction = {
       product_id: data.product_id,
       buyer_name: data.buyer_name,
       qty: data.qty,
       order_price: data.order_price * data.qty * 1000,
       photo: data.photo,
       sizes: data.sizes
    }
    return await addTransaction(newData)
}

const getAllTransactionService = async () => {
    return await getAllTransaction()
}

const changeStatusService = async (id: number) => {
    return await changeStatus(id)
}

const deleteTransactionService = async (id: number) => {
    return await deleteTransaction(id)
}

const getTransactionByIdService = async (id: number) => {
    return await getTransactionById(id)
}

export {addTransactionService, getAllTransactionService, deleteTransactionService, getTransactionByIdService, changeStatusService}