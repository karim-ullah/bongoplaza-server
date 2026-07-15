import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getSellerProducts, getSingleProduct } from "../controllers/productController";

const router = Router()

router.get('/', getProducts)
router.get('/:id', getSellerProducts)
router.get('/product/:productId', getSingleProduct)
router.post('/', createProduct)
router.delete('/:productId', deleteProduct)


export default router