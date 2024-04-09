const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        shoeId: {
            type: Schema.Types.ObjectId,
            ref: 'Shoe'
        },
        size: Number,
        quantity: Number
    }],
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
