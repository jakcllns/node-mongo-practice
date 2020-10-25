const Product = require('../models/product');

//Request URL property can be used directly here because it is coming from the base URL

//GET
exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Shopping Cart',
                path: req.url,
                products: products,
                total: 0
            })
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders => {
        res.render(
            'shop/orders', 
            {
                pageTitle: 'Orders', 
                path: req.url, orders: 
                orders
            });
    })
    .catch(err => console.log(err));
    
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: req.url, hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: req.url, hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-detail', {pageTitle: 'Product Detail - ' + product.title, path: '/products', product: product});
    });
};

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
};

//POST
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
    req.user.removeItemFromCart(req.body.productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            return res.redirect('/orders');
        })
        .catch(err => console.log(err));

};
