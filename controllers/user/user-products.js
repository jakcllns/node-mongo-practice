const Product = require('../../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');  
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Shopping Cart', path: req.url,})
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: req.url, hasProducts: products.length >0});
    });
}

exports.getProductDetail = (req, res, next) => {
    res.render('shop/product-detail', {pageTitle: 'Product Detail', path: req.url,})
}

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
}