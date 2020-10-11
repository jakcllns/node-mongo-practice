const router = require('express').Router();
const productsController = require('../controllers/admin/admin-products');
const path = require('path');

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);

router.get('/edit-product', productsController.getEditProduct);

router.get('/products', productsController.getProducts);

exports.routes = router;