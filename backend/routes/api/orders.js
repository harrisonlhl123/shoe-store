const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const { requireUser } = require('../../config/passport');

// Get order history for a user
router.get('/user/:userId', requireUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
