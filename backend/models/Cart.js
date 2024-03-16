const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [{
            shoe: {
                type: Schema.Types.ObjectId,
                ref: 'Shoe'
            },
            size: Number,
            quantity: Number
        }],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
