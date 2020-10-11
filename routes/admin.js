const router = require('express').Router();
const productsController = require('../controllers/products');
const path = require('path');

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);

exports.routes = router;