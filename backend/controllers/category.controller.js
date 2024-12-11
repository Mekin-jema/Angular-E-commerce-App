import Category from '../models/category.model.js';
import mongoose from 'mongoose';

export const getAllCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList) {
            res.status(500).json({ success: false });
        }
        res.status(200).send(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
export const getCategoryById = async (req, res) => {
    console.log(req.params.id);
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            res.status(500).json({ message: 'The category with the given ID was not found.' });
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const insertCategory = async (req, res) => {
    console.log(req.body);
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });
        category = await category.save();

        if (!category) return res.status(400).send('the category cannot be created!');

        res.send(category);
    } catch (error) {
        console.log('i am in error');
        res.status(500).json({ success: false, error: error });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon || category.icon,
                color: req.body.color
            },
            { new: true }
        );

        if (!category) return res.status(400).send('the category cannot be created!');

        res.send(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }

        // Find the category by ID and remove it
        const category = await Category.findByIdAndDelete(id);

        if (category) {
            return res.status(200).json({ success: true, message: 'the category is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'category not found!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
