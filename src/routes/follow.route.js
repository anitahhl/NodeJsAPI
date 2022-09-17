const express = require('express');
const router = express.Router();

const userFollowController = require('../controllers/userFollow.controller');

const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/users/:id', auth(), awaitHandlerFactory(userFollowController.getFollowers)); // localhost:3000/api/v1/follow/users/:user_id
router.get('/users/followers/:id', auth(), awaitHandlerFactory(userFollowController.getFollows)); // localhost:3000/api/v1/follow/users/followers/:follower_id
router.post('/users/:id', auth(), awaitHandlerFactory(userFollowController.followUser)); // localhost:3000/api/v1/follow/users/:user_id


module.exports = router;