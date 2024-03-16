const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
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

// Add item to cart
router.post('/', requireUser, async (req, res) => {
    try {
        const { shoeId, size, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const item = cart.items.find(item => item.shoe.toString() === shoeId && item.size === size);

        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ shoe: shoeId, size, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
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



