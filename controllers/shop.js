const Product = require('../models/product');
const Cart = require('../models/cart');
//Request URL property can be used directly here because it is coming from the base URL

//GET
exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Shopping Cart',
                path: req.url,
                products: products,
                total: 0
            })
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Orders', path: req.url,})
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: req.url, hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(result => {
        const {dataValues} = result; 
        res.render('shop/product-detail', {pageTitle: 'Product Detail - ' + dataValues.title, path: '/products', product: dataValues});
    });
}

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
}

//POST
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let userCart;
    req.user.getCart()
        .then(cart => {
            userCart = cart;     
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products => {
            console.log(products);
            if (products.length > 0 ){
                return userCart.addProduct(products[0], {
                    through: { quantity: products[0].cartItem.quantity + 1}
                });
            }
            return Product.findByPk(prodId).then(product => userCart.addProduct(product, {through: { quantity: 1}})).catch(err => console.log(err));
        })
        .then(() =>  res.redirect('/cart'))
        .catch(err => console.log(err));

}

exports.postCartDeleteItem = (req, res, next) => {
    req.user.getCart()
        .then(cart => cart.getProducts({where: {id: req.body.productId}}))
        .then(products => products[0].cartItem.destroy())
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}

