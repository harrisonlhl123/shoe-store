const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const { requireUser } = require('../../config/passport');

// Get order history for a user
router.get('/user/:userId', requireUser, async (req, res) => {
    try {
        const authenticatedUserId = req.user.id;
        const requestedUserId = req.params.userId;

        // Check if the requested user ID matches the authenticated user ID
        if (requestedUserId !== authenticatedUserId) {
            return res.status(403).json({ message: 'Unauthorized access to user cart' });
        }

        const orders = await Order.find({ user: authenticatedUserId }).populate('items.shoeId', '_id name price photoUrl');
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new order
router.post('/', requireUser, async (req, res) => {
    try {
        const { user: userId, items } = req.body;

        // Create a new order
        const order = new Order({ user: userId, items });

        // Calculate total price
        const totalPrice = items.reduce((total, item) => {
            return total + (item.quantity * item.shoeId.price);
        }, 0);

        order.totalPrice = totalPrice;

        // Save the order
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
