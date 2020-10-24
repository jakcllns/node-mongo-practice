const mongodb = require('mongodb');
const Product = require('../models/product');

const ObjectId  = mongodb.ObjectId;

const appendPrefix = url => {
    return ['/admin', url].join('');
}

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: appendPrefix(req.url), editing: false});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.price, req.body.description,req.body.imageUrl)
    product.save()
        .then(result => {
            console.log('Created Product');
            res.redirect(appendPrefix('/products'));
        })
        .catch(err => console.log(err));
    
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: appendPrefix(req.url), hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
};


exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    console.log(req.params.productId)
    Product.findById(req.params.productId).then(product => {
        res.render('admin/edit-product', {pageTitle: 'Edit Product - ' + product.title + product.title, path: appendPrefix(req.url), product: product, editing: editMode});
    });    
}

exports.postEditProduct = (req, res, next) => {
    const product = new Product(req.body.title,req.body.price,req.body.description,req.body.imageUrl, req.body.productId);
    product.save()
        .then(() => {
            res.redirect(appendPrefix('/products'));
        }).catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(() => res.redirect(appendPrefix('/products')))
        .catch(err => console.log(err));
}
