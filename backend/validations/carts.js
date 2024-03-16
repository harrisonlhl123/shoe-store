const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateCartInput = [
    check('user')
        .exists({ checkFalsy: true })
        .withMessage('user is required'),
    handleValidationErrors
];

module.exports = validateCartInput;