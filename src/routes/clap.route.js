const express = require('express');
const router = express.Router();

const storyClapController = require('../controllers/storyClap.controller');
const commentClapController = require('../controllers/commentClap.controller');

const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/stories/:id', auth(), awaitHandlerFactory(storyClapController.getStoryClapById)); // localhost:3000/api/v1/clap/stories/:story_id
router.get('/stories/users/:id', auth(), awaitHandlerFactory(storyClapController.getUserClapForStory)); // localhost:3000/api/v1/clap/stories/users/:story_id
router.post('/stories/:id', auth(), awaitHandlerFactory(storyClapController.clapForStory)); // localhost:3000/api/v1/clap/stories/:story_id

///

router.post('/comments/:id', auth(), awaitHandlerFactory(commentClapController.clapForComment)); // localhost:3000/api/v1/clap/comments/:comment_id


module.exports = router;