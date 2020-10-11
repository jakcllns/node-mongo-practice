const router = require('express').Router(); 
const path = require('path');

const productsController = require('../controllers/shop');

router.get('/cart', productsController.getCart);

router.get('/products', productsController.getProducts);

router.get('/product-detail', productsController.getProductDetail);

router.get('/checkout')

router.get('/', productsController.getProducts);

exports.routes = router;