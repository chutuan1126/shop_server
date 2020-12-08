const express = require('express');
const controller = require('../controller/user.controller');

const router = express.Router();

router.get('/', controller.users);

router.get('/:id', controller.view);

router.post('/delete/:id', controller.postDelete);

router.get('/edit/:id', controller.getEdit);

router.post('/edit/:id', controller.postEdit);

module.exports = router;