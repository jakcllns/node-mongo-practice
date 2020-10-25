const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class User {
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart ? cart: {items: [], totalItems: 0, totalPrice: 0.00};// {items: []}
        this._id = new mongodb.ObjectId(id);
    }

    save() {
        return getDb().collection('users').insertOne(this);
    }

    addToCart(product) {

        const cartProduct = {...this.cart.items.find(cp => {
            return cp.productId.toString() === product._id.toString();
        })};

        if(!cartProduct.productId){
            cartProduct.productId = product._id;
            cartProduct.quantity = 0
        }
        
        cartProduct.quantity++

        const updatedCart = {
            items: [cartProduct,...this.cart.items.filter(p => p.productId.toString() !== product._id.toString())], 
            totalItems: this.cart.totalItems + 1, 
            totalPrice: +this.cart.totalPrice + +product.price
        };

        return getDb().collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
    }

    static findById(userId) {
        return getDb().collection('users').findOne({_id: new mongodb.ObjectId(userId)});
    }
}

module.exports = User;