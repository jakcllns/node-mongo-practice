const router = require('express').Router(); 
const path = require('path');
const routeDir = require('../util/path');

const adminData = require('./admin');

router.get('/',(req, res, next) => {
    const products = adminData.products;
    // res.sendFile(path.join(routeDir,'views','shop.html'));
    res.render('shop', {prods: products, docTitle: 'Shop'});
});

module.exports = router;