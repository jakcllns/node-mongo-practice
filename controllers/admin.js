const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl,req.body.description, req.body.price);
    product.save();
    res.redirect('/admin/products');  
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: req.url, hasProducts: products.length >0});
    });
}

exports.getEditProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Edit Product', path: req.url});
}
