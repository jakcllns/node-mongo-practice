const router = require('express').Router(); 
const path = require('path');

const productsController = require('../controllers/shop');


//GET
router.get('/cart', productsController.getCart);

router.get('/products', productsController.getProducts);

router.get('/products/:productId',productsController.getProduct);

router.get('/checkout');

router.get('/orders', productsController.getOrders);

router.get('/', productsController.getProducts);

//POST
router.post('/cart', productsController.postCart);

router.post('/cart-delete-item', productsController.postCartDeleteItem);

exports.routes = router;