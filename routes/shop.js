const router = require('express').Router(); 
const path = require('path');
const routeDir = require('../util/path');

router.get('/',(req, res, next) => {
    res.sendFile(path.join(routeDir,'views','shop.html'));
});

module.exports = router;