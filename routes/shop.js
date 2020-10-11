const router = require('express').Router(); 
const path = require('path');

const productsControler = require('../controllers/products');


router.get('/', productsControler.getProducts);

exports.routes = router;