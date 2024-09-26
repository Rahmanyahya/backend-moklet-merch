import {product_jenis} from '@prisma/client'
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

const root_dir = path.join(__dirname,'../')

const mainImage = "product-images"
const modelImage = "model"

export {dataProduct,root_dir, mainImage, modelImage}