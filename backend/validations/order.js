const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateOrderInput = [
    check('user')
        .exists({ checkFalsy: true })
        .withMessage('user is required'),
    check('items')
        .exists({ checkFalsy: true })
        .withMessage('items array required'),
    check('totalPrice')
        .exists({ checkFalsy: true })
        .withMessage('Total price is required'),
    handleValidationErrors
];

module.exports = validateOrderInput;