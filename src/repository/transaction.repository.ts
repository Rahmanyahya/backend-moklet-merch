import { transaction } from "../config";
import prisma from "../db/db";

const addTransaction = async (transactionData: transaction) => {
    return await prisma.transaction.create({data:{
     product_id: transactionData.product_id,
     buyer_name: transactionData.buyer_name,
     photo: transactionData.photo,
     qty: transactionData.qty,
     order_price: transactionData.order_price,
     size: transactionData.sizes,
     status: "process"
    }})
}

const getAllTransaction = async () => {
    return await prisma.transaction.findMany({include: {Product: true}}) || null;
}

const changeStatus = async (id: number) => {
    return await prisma.transaction.update({where: {id}, data: {status: "approved"}})
}

const deleteTransaction = async (id: number) => {
   return await prisma.transaction.delete({where: {id}})
}

const getTransactionById = async (id: number) => {
    return await prisma.transaction.findUnique({where: {id}})
}   

export {addTransaction, getAllTransaction, deleteTransaction, getTransactionById, changeStatus}