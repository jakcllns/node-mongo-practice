const Product = require('../models/product');

const appendPrefix = url => {
    return ['/admin', url].join('');
}

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: appendPrefix(req.url), editing: false});
}

exports.postAddProduct = (req, res, next) => {
    Product.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }).then(result => {
        res.redirect(appendPrefix('/add-product'));  
    }).catch(err => console.log(err));
    
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
            res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: appendPrefix(req.url), hasProducts: products.length >0})
    }).catch(err => console.log(err));
};


exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(result => {
        const {dataValues} = result;
        if(!dataValues){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product - ' + dataValues.title, path: appendPrefix(req.url), editing: editMode, product: dataValues});
    }).catch(err => console.log(err));
    
}

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.productId).then(product => {
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        return product.save();
    }). then(() => {
        res.redirect(appendPrefix('/products'));
    }).catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(() => res.redirect(appendPrefix('/products')))
        .catch(err => console.log(err));
}
