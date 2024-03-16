const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateCartInput = [
    check('user')
        .exists({ checkFalsy: true })
        .withMessage('user is required'),
    check('items')
        .exists({ checkFalsy: true })
        .withMessage('items array required'),
    handleValidationErrors
];

module.exports = validateCartInput;