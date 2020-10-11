const router = require('express').Router(); 
const path = require('path');

const productsController = require('../controllers/user/user-products');

router.get('/cart', productsController.getCart);

router.get('/products', productsController.getProducts);

router.get('/product-detail', productsController.getProductDetail);

router.get('/', productsController.getShop);

exports.routes = router;