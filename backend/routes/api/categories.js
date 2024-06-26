const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const validateCategoryInput = require('../../validations/categories')

// GET all categories
router.get('/', async (req,res) => {
    try {
        const categories = await Category.find()
            .populate('name');
        return res.json(categories);
    }
    catch (err) {
        return res.json([]);
    }
});


// GET one category
router.get('/:id', async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)

        return res.json(category);
    }
    catch (err) {
        const error = new Error('Category not found')
        error.statusCode = 404;
        return next(error);
    }
});

module.exports = router;