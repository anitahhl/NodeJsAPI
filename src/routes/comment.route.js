const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

const auth = require('../middleware/auth.middleware')
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCommentSchema, updateCommentSchema } = require('../middleware/validators/commentValidator.middleware');


router.get('/stories/:id', auth(), awaitHandlerFactory(commentController.getAllComments)); // localhost:3000/api/v1/comments/stories/:story_id
router.post('/', auth(), createCommentSchema, awaitHandlerFactory(commentController.createComment)); // localhost:3000/api/v1/comments
router.patch('/:id', auth(), updateCommentSchema, awaitHandlerFactory(commentController.updateComment)); // localhost:3000/api/v1/comments/:comment_id , using patch for partial update
router.delete('/:id', auth(), awaitHandlerFactory(commentController.deleteComment)); // localhost:3000/api/v1/comments/:comment_id
router.get('/:id/replies', auth(), awaitHandlerFactory(commentController.getAllReplies)); // localhost:3000/api/v1/comments/:comment_id/replies


module.exports = router;