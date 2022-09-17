const { body } = require('express-validator');


exports.createCommentSchema = [
    body('target_id')
        .exists()
        .withMessage('Story/Comment ID is required')
        .isNumeric()
        .withMessage('Must be a number'),
    body('parent_id')
        .exists()
        .isNumeric()
        .withMessage('Must be a number'),
    body('content')
        .exists()
        .withMessage('Your content is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
];

exports.updateCommentSchema = [
    body('content')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['content'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];