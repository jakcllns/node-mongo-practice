const Product = require('../models/product');

const appendPrefix = url => {
    return ['/admin', url].join('');
}

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: appendPrefix(req.url), editing: false});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null,req.body.title, req.body.imageUrl,req.body.description, req.body.price);
    product.save()
        .then(result => {
            console.log(result);
            res.redirect(appendPrefix('/products'));  
        })
        .catch(err => console.log(err));
    
    
    
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(result => {
            res.render('admin/products', {prods: result.rows, pageTitle: 'Admin Products', path: appendPrefix(req.url), hasProducts: result.rows.length >0});
    });
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(result => {
        const [product] = result.rows;
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product - ' + product.title, path: appendPrefix(req.url), editing: editMode, product: product});
    }).catch(err => console.log(err));
    
}

exports.postEditProduct = (req, res, next) => {
    Product.findById(req.body.productId, prod => {
        prod.title = req.body.title;
        prod.imageUrl = req.body.imageUrl;
        prod.price = req.body.price;
        prod.description = req.body.description;
        prod.save();
        res.redirect(appendPrefix('/products'));
    });
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(() => res.redirect(appendPrefix('/products')))
        .catch(err => console.log(err));
}
