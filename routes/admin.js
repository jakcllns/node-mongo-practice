const router = require('express').Router();
const adminController = require('../controllers/admin');
const path = require('path');


// Get request
router.get('/add-product', adminController.getAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.get('/products', adminController.getProducts);

//Post request
router.post('/add-product',adminController.postAddProduct);

exports.routes = router;