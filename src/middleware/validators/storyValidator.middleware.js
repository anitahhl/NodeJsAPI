const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createStorySchema = [
    body('is_premium')
        .exists()
        .isIn(['0', '1'])
        .withMessage('Invalid premium type'),
    body('title')
        .exists()
        .withMessage('Your title is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('content')
        .exists()
        .withMessage('Your content is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
];

exports.updateStorySchema = [
    body('is_premium')
        .optional()
        .isIn(['0', '1'])
        .withMessage('Invalid premium type'),
    body('title')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('content')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['is_premium', 'title', 'content'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];