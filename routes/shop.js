const router = require('express').Router(); 
const path = require('path');

const productsController = require('../controllers/shop');

router.get('/cart', productsController.getCart);

router.post('/cart', productsController.postCart);

router.get('/products', productsController.getProducts);

router.get('/products/:productId',productsController.getProduct);

router.get('/checkout');

router.get('/orders', productsController.getOrders);

router.get('/', productsController.getProducts);

exports.routes = router;