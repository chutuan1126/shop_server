const express = require('express');
const controller = require('../controller/product.controller');

const router = express.Router();

router.post('/getproduct', controller.getProducts);

router.post('/singleproduct', controller.getSingleProduct);

module.exports = router;