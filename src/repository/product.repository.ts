import { dataProduct } from "../config";
import prisma from "../db/db";

const addProduct = async (dataProduct: dataProduct) => {
    return await prisma.product.create({
        data: {
            product_name: dataProduct.name,
            price: dataProduct.price,
            description: dataProduct.description,
            jenis: dataProduct.category,
            discount: dataProduct.discount,
            highlight: dataProduct.highlight,
            photo: dataProduct.photo
        }
    }) 
}

const updateProduct = async (newDataProduct: dataProduct, id: number) => {
   return await prisma.product.update({
    where: {id},
    data: {
        product_name: newDataProduct.name,
        price: newDataProduct.price,
        description: newDataProduct.description,
        jenis: newDataProduct.category,
        discount: newDataProduct.discount,
        highlight: newDataProduct.highlight,
        photo: newDataProduct.photo,
        updatedAt: { set: new Date() }
    }
   }) 
}

const deleteProduct = async (id: number) => {
    return await prisma.product.delete({where: {id}}) 
}

const getAllProducts = async () => {
    return await prisma.product.findMany() 
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({where: {id}}) || null
}

const getProductByName = async (nama: string) => {
    return await prisma.product.findUnique({where: {product_name: nama}}) || null
}

const getProductByCategory = async (category: any) => {
    return await prisma.product.findMany({where: {jenis: category}}) ||null
}



export {addProduct, updateProduct, deleteProduct, getAllProducts, getProductById,getProductByName,getProductByCategory}