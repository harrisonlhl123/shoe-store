const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Shoe = mongoose.model('Shoe');

// GET all shoes
router.get('/', async (req, res) => {
    try {
        const shoes = await Shoe.find()
            .populate('category', '_id name');
        return res.json(categories);
    }
    catch (err) {
        return res.json([]);
    }
});

// GET all shoes from specified category
router.get('/:categoryId/', async (req, res, next) => {
    try {
        const shoes = await Shoe.find({ category: req.params.categoryId })
            .populate('category', '_id name');
        
        return res.json(shoes);
    }
    catch (err) {
        const error = new Error('Error retrieving shoes for this category');
        error.statusCode = 500; 
        return next(error);
    }
});

//GET one shoe
router.get('/:id', async (req, res, next) => {
    try {
        const shoe = await Shoe.findById(req.params.id)
            .populate('category', '_id name')

        return res.json(shoe);
    }
    catch (err) {
        const error = new Error('Shoe not found');
        error.statusCode = 404;
        error.errors = { message: "No shoe found with that id" }
        return next(error);
    }

});

module.exports = router;