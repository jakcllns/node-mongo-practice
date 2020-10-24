const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id): undefined;
    }

    save() {
        const db = getDb()
        const dbOp = this._id ? db.collection('products').updateOne({_id: this._id}, {$set: this}): db.collection('products').insertOne(this);
        return dbOp
            .then(result => {
                // console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        return getDb().collection('products').find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(id) {
        return getDb().collection('products').find({_id: mongodb.ObjectID(id)}).next()
            .then(product => product)
            .catch(err=> console.log(err));
    }

    static deleteById(prodId){
        return getDb().collection('products')
            .deleteOne({_id: new mongodb.ObjectId(prodId)})
                .then(result => {
                    console.log(`Deleted product: ${prodId}`);
                })
                .catch(err => console.log(err))
    };
    
}

module.exports = Product;