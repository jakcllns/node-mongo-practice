const Product = require('../models/product');

const appendPrefix = url => {
    return ['/admin', url].join('');
}

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: appendPrefix(req.url)});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl,req.body.description, req.body.price);
    product.save();
    res.redirect(this.appendPrefix('/products'));  
}

exports.getProducts = (req, res, next) => {
    console.log(req.url);
    const products = Product.fetchAll(products => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: appendPrefix(req.url), hasProducts: products.length >0});
    });
}

exports.getEditProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Edit Product', path: appendPrefix(req.url)});
}
