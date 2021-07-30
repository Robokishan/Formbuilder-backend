var router = require('express').Router();
var usersController = require('../../controllers/v1/users.controller');
//register api for owner





router.post('/owner/register', usersController.createUser);
module.exports = router;