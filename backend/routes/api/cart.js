const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const Shoe = mongoose.model('Shoe')
const { requireUser } = require('../../config/passport');

// Get user's cart
router.get('/user/:userId', requireUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.shoe');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});


// Add items to cart
router.post('/', requireUser, async (req, res) => {
    try {
        const { user: requestedUserId, items } = req.body;
        const authenticatedUserId = req.user.id;

        // Check if the requested user ID matches the authenticated user ID
        if (requestedUserId !== authenticatedUserId) {
            return res.status(403).json({ message: 'Unauthorized access to user cart' });
        }

        // Continue with adding items to the cart for the authenticated user
        let cart = await Cart.findOne({ user: authenticatedUserId }).populate('items.shoeId', '_id');

        if (!cart) {
            cart = new Cart({ user: authenticatedUserId, items: [] });
        } else {
            cart = await cart.populate('items.shoeId', '_id')
        }

        console.log('Cart after populate:', cart);

        let itemIndex = -1;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const existingShoeId = typeof item.shoeId === 'object' ? item.shoeId._id.toString() : item.shoeId.toString();
            const newItemShoeId = typeof items[0].shoeId === 'object' ? items[0].shoeId._id.toString() : items[0].shoeId.toString();
            if (existingShoeId === newItemShoeId && item.size === items[0].size) {
                itemIndex = i;
                break;
            }
        }
        
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += items[0].quantity;
        } else {
            const shoeObject = await Shoe.findById(items[0].shoeId);
            console.log('Shoe Object:', shoeObject);
            const shoeId = shoeObject._id; // Get the ID of the shoe object
            cart.items.push({ shoeId, size: items[0].size, quantity: items[0].quantity }); // Set shoeId to the ID of the shoe object
        }
        

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});





// Remove item from cart
router.delete('/:itemId', requireUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;



