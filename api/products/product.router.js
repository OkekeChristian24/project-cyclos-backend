const { getProductData } = require('./product.controller');
const router = require('express').Router();

router.post('/', getProductData);

module.exports = router;
