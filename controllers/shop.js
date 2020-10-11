const Product = require('../models/product');
const Cart = require('../models/cart');
//Request URL property can be used directly here because it is coming from the base URL

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Shopping Cart', path: req.url,})
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Orders', path: req.url,})
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: req.url, hasProducts: products.length >0});
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, prod => {
        res.render('shop/product-detail', {pageTitle: 'Product Detail - ' + prod.title, path: '/products', product: prod});
    });
    
    // const products = Product.fetchAll(products => {
    //     res.render('shop/product-detail', {prods: products, pageTitle: 'Product Detail', path: req.url, hasProducts: products.length >0});
    // });
}

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
}