const router = require('express').Router();
const adminController = require('../controllers/admin');
const path = require('path');

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product',adminController.postAddProduct);

router.get('/edit-product', adminController.getEditProduct);

router.get('/products', adminController.getProducts);

exports.routes = router;