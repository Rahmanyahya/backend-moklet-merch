import {product_jenis} from '@prisma/client'
import { Size } from '@prisma/client';
import path from 'path'

interface dataProduct {
    name: string;
    price: number;
    description: string;
    category: product_jenis;
    highlight: string;
    photo: string;
    discount?: number;
}


interface transaction {
    product_id: number;
    buyer_name: string,
    photo: string,
    qty: number,
    order_price: number,
    sizes: Size
}

const root_dir = path.join(__dirname,'../')

const mainImage = "product-images"
const paymentImage = "payment-images"

export {dataProduct,root_dir, mainImage, paymentImage, transaction}