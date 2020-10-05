const router = require('express').Router();

const path = require('path');
const routeDir = require('../util/path');

const products = [];

router.get('/add-product', (req,res,next)=>{
    res.sendFile(path.join(routeDir,'views','add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');  
});

exports.routes = router;
exports.products = products;