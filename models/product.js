const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(require('../util/path'),'data','products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err || fileContent.length === 0) {
            return cb([]);
        }
        cb(JSON.parse(fileContent).map(prod => new Product(prod)));
    });
};

class Product {
    constructor(id, title, imageUrl, description, price) {
        if(arguments.length === 1 & typeof arguments[0] === 'object') {
            Object.assign(this, arguments[0]);
            return null;
        }
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                return fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }

            this.id = Math.random().toString().replace('0.', '');
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }


    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const newProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(newProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
                console.log(err);
            });
            cb();
        });

    }
};

module.exports = Product;