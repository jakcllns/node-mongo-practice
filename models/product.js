const db = require('../util/database');

const Cart = require('./cart');

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
        const value = `'${this.title}',${this.price},'${[this.description, this.imageUrl].join("','")}'`
        console.log(value);
        return db.query(`insert into products (title, price, description, "imageUrl") values (${value})`);
    }


    static fetchAll(){
        return db.query('select * from products');
    }

    static findById(id) {
        return db.query(`select * from products where id =  + ${id}`);
    }

    static deleteById(id) {
        return db.query(`delete from products where id = + ${id}`);
    }
};

module.exports = Product;