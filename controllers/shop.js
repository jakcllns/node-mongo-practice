const Product = require('../models/product');
const Cart = require('../models/cart');
//Request URL property can be used directly here because it is coming from the base URL

//GET
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        const cartProducts = [];
        Product.fetchAll(products => {
            for (product of cart.products) {
                let prod = products.find(p => p.id === product.id);
                if(prod) {
                    cartProducts.push({productData: prod, qty: product.qty});
                }
            }
            
            res.render('shop/cart', {pageTitle: 'Shopping Cart', path: req.url, products: cartProducts, total: cart.totalPrice});
        });
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Orders', path: req.url,})
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(result => {
        res.render('shop/product-list', {prods: result.rows, pageTitle: 'Products', path: req.url, hasProducts: result.rows.length >0});
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(result => {
        const [product] = result.rows; 
        res.render('shop/product-detail', {pageTitle: 'Product Detail - ' + product.title, path: '/products', product: product});
    });
}

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
}

//POST
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteItem = (req, res, next) => {
    Cart.deleteProduct(req.body.productId, req.body.productPrice);
    res.redirect('/cart');
}

