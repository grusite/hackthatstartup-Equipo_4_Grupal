const express = require('express');
const expressDeliver = require('express-deliver');
const router = express.Router();
const userController = require('../controllers/userController');

expressDeliver(router);

//Auth routes
router.post('/login', userController.login);
router.post('/register', userController.register);

//CRUD routes
router.get('/', userController.listUsers);
router.get('/:userEmail', userController.readUser);
router.put('/:userEmail', userController.updateUser);
router.delete('/:userEmail', userController.deleteUser);

module.exports = router;
