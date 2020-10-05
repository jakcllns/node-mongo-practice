const router = require('express').Router(); 
const path = require('path');
const routeDir = require('../util/path');

const adminData = require('./admin');

router.get('/',(req, res, next) => {
    console.log(adminData.products)
    res.sendFile(path.join(routeDir,'views','shop.html'));
});

module.exports = router;