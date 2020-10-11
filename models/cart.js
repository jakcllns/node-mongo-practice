const fs = require('fs');
const path = require('path');

const p = path.join(require('../util/path'),'data','cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const newCart = {...cart};
            let prodIndex = newCart.products.findIndex(prod => prod.id===id)
            
            newCart.totalPrice += +productPrice;

            // Add new product/ increate quantity
            if (prodIndex !== -1) {
                newCart.products[prodIndex].qty += 1
            } else {
                newCart.products.push({id: id, qty: 1});
            }          
            
            fs.writeFile(p, JSON.stringify(newCart), (err) => {
                console.log(err);
            });
        });
        
        
    }
}