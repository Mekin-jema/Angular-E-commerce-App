import express from 'express';
import Category from '../models/category.model.js';
import {
    deleteCategory,
    getAllCategories,
    getCategoryById,
    insertCategory,
    updateCategory
} from '../controllers/category.controller.js';

const router = express.Router();

router.get(`/get-all-categories`, getAllCategories);

router.get('/get-single-category/:id', getCategoryById);

router.post('/add-category', insertCategory);

router.put('/update-category/:id', updateCategory);

router.delete('/delete-category/:id', deleteCategory);

export default router;
