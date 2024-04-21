const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Shoe = mongoose.model('Shoe');

// GET all shoes
router.get('/', async (req, res) => {
    try {
        const shoes = await Shoe.find()
            .populate('category', '_id name');
        
        let shoesObject = {};
        shoes.forEach((shoe) => {
            shoesObject[shoe._id] = shoe
        })
        return res.json(shoesObject);
    }
    catch (err) {
        return res.json([]);
    }
});

// GET all shoes from specified category
router.get('/category/:categoryId/', async (req, res, next) => {
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
router.get('/:shoeId', async (req, res, next) => {
    try {
        const shoe = await Shoe.findById(req.params.shoeId)
            .populate('category', '_id name')

        return res.json(shoe);
    }
    catch (err) {
        const error = new Error('Shoe not found');
        error.statusCode = 404;
        return next(error);
    }

});


// Search shoes
router.get('/lookup/search', async (req, res, next) => {
    try {
        const { name } = req.query;

        const searchQuery = {};
        if (name) {
            searchQuery.name = { $regex: new RegExp(name, 'i') };
        }

        const shoes = await Shoe.find(searchQuery)
            .populate('category', '_id name');

        return res.json(shoes);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;