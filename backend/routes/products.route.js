import express from 'express';

import {
    addGalleryImages,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    getTotalNumberOfProducts,
    insertProduct,
    updateProduct
} from '../controllers/product.controller.js';
import uploadOptions from '../utils/uploadOptions.js';
const router = express.Router();

router.get(`/get-all-products`, getAllProducts);

router.get(`/get-product-by-id/:id`, getProductById);

router.post(`/add-product`, uploadOptions.single('image'), insertProduct);

router.put('/update-proudct/:id', uploadOptions.single('image'), updateProduct);

router.put('/update-images/:id', uploadOptions.array('images', 10), addGalleryImages);
router.delete('/delete-product/:id', deleteProduct);

router.get(`/get-total-products`, getTotalNumberOfProducts);

router.get(`/get-featured-products/:count`, getFeaturedProducts);

export default router;
