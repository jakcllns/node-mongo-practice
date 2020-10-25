const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class User {
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart ? cart: {items: []};// {items: []}
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
            items: [cartProduct,...this.cart.items.filter(p => p.productId.toString() !== product._id.toString())]
        };

        return getDb().collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
    }

    getCart(){
        return getDb().
            collection('products')
            .find({_id: {$in: this.cart.items.map(p => p.productId)}})
            .toArray()
            .then(products => {
               return products.map(p => {
                   return {
                        ...p, 
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
               }) 
            });
    }

    removeItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        return getDb().collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        )
    }

    static findById(userId) {
        return getDb().collection('users').findOne({_id: new mongodb.ObjectId(userId)});
    }

}

module.exports = User;