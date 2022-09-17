const express = require('express');
const router = express.Router();

const storyBookmarkController = require('../controllers/storyBookmark.controller');

const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', auth(), awaitHandlerFactory(storyBookmarkController.getMyBookmark)); // localhost:3000/api/v1/bookmark
router.post('/:id', auth(), awaitHandlerFactory(storyBookmarkController.addBookmark)); // localhost:3000/api/v1/bookmark/:story_id`


module.exports = router;