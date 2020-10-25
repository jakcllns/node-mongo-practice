const Product = require('../models/product');

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

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: req.url, hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: req.url, hasProducts: products.length >0});
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-detail', {pageTitle: 'Product Detail - ' + product.title, path: '/products', product: product});
    });
}

exports.getShop = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: req.url})
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => res.render('shop/orders', { path: req.url, pageTitle: 'Your Orders', orders: orders}))
        .catch(err => console.log(err));
}
//POST
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('Post User:',req.user)
    Product.findById(prodId)
        .then(product => {
            console.log('User:',req.user);
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err));
    // let userCart;
    // req.user.getCart()
    //     .then(cart => {
    //         userCart = cart;     
    //         return cart.getProducts({where: {id: prodId}});
    //     })
    //     .then(products => {
    //         console.log(products);
    //         if (products.length > 0 ){
    //             return userCart.addProduct(products[0], {
    //                 through: { quantity: products[0].cartItem.quantity + 1}
    //             });
    //         }
    //         return Product.findByPk(prodId).then(product => userCart.addProduct(product, {through: { quantity: 1}})).catch(err => console.log(err));
    //     })
    //     .then(() =>  res.redirect('/cart'))
    //     .catch(err => console.log(err));

}

exports.postCartDeleteItem = (req, res, next) => {
    req.user.getCart()
        .then(cart => cart.getProducts({where: {id: req.body.productId}}))
        .then(products => products[0].cartItem.destroy())
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
    let fetchedProducts;
    let fetchedCart;
    req.user.getCart()
        .then(cart=> {
            fetchedCart = cart;
            return cart.getProducts()
        })
        .then(products => {
            fetchedProducts = products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity }
                return product;
            });
            return req.user.createOrder();
        })
        .then(order => order.addProducts(fetchedProducts))
        .then(result => fetchedCart.setProducts(null))
        .then(result => res.redirect('/orders'))
        .catch(err => console.log(err));

}
