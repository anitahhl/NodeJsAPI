const express = require('express');
const router = express.Router();

const storyController = require('../controllers/story.controller');

const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createStorySchema, updateStorySchema } = require('../middleware/validators/storyValidator.middleware');


router.get('/', awaitHandlerFactory(storyController.getAllStories)); // localhost:3000/api/v1/stories
router.get('/:id', auth(), awaitHandlerFactory(storyController.getStoryById)); // localhost:3000/api/v1/stories/:story_id
router.post('/', auth(), createStorySchema, awaitHandlerFactory(storyController.createStory)); // localhost:3000/api/v1/stories
router.patch('/:id', auth(), updateStorySchema, awaitHandlerFactory(storyController.updateStory)); // localhost:3000/api/v1/stories/:story_id , using patch for partial update
router.delete('/:id', auth(), awaitHandlerFactory(storyController.deleteStory)); // localhost:3000/api/v1/stories/:story_id


module.exports = router;