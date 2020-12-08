const express = require('express');
const controller = require('../controller/auth.controller');

const router = express.Router();

router.get('/signUp', controller.login);
router.post('/login', controller.postLogin);
router.post('/signUp', controller.postSignUp);

module.exports = router;