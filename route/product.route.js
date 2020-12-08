const express = require('express');
const controller = require('../controller/product.controller');

const router = express.Router();

router.post('/getproduct', controller.getProducts);

module.exports = router;