const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateShoeInput = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('category')
        .exists({ checkFalsy: true })
        .withMessage('Category is required'),
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Photo URL is required'),
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Photo URL is required'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('size')
        .exists({ checkFalsy: true })
        .withMessage('Size is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price is required'),
    handleValidationErrors
];

module.exports = validateShoeInput;