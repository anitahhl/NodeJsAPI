const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/:user_id
router.get('/premium', auth(Role.Premium), awaitHandlerFactory(userController.getPremiumUser)); // localhost:3000/api/v1/users/premium
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/:id', auth(), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/:user_id , using patch for partial update
router.delete('/:id', auth(), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/:user_id

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login


module.exports = router;