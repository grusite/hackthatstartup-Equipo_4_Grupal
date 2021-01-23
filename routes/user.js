const express = require('express');
const expressDeliver = require('express-deliver');
const router = express.Router();
const userController = require('../controllers/userController');

expressDeliver(router);

router.get('/', userController.listUsers);
router.get('/:userEmail', userController.readUser);
router.post('/', userController.addUser);
router.put('/:userEmail', userController.updateUser);
router.delete('/:userEmail', userController.deleteUser);

module.exports = router;
