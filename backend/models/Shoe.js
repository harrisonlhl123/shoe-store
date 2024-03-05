const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    photoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        // required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Shoe', shoeSchema);
