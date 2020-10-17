const Product = require('../models/product');

const appendPrefix = url => {
    return ['/admin', url].join('');
}

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: appendPrefix(req.url), editing: false});
}

exports.postAddProduct = (req, res, next) => {
    req.user.createProduct({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
    }).then(result => {
        res.redirect(appendPrefix('/products'));  
    }).catch(err => console.log(err));
    
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts().then(products => {
            res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: appendPrefix(req.url), hasProducts: products.length >0})
    }).catch(err => console.log(err));
};


exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
        .then(result => {
            console.log(result);
            const product = result[0];
            if(!product){
                return res.redirect('/');
            }
            res.render('admin/edit-product', {pageTitle: 'Edit Product - ' + product.title, path: appendPrefix(req.url), editing: editMode, product: product});
    })
        .catch(err => console.log(err));
    
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
    Product.findByPk(req.body.productId)
        .then(product => {
            return product.destroy();
        })
        .then(() => res.redirect(appendPrefix('/products')))
        .catch(err => console.log(err));
}
