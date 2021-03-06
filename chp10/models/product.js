const fs = require('fs');
const path = require('path');
const db = require("../util/db");

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // db.execute(`INSERT INTO products (title, description, price, imageUrl) values ('${this.title}', '${this.description}', ${this.price}, '${this.imageUrl}')`).then(data => {
    //   console.log(data);
    // }).catch(err => {
    //   console.log(err);
    // });

    db.execute('INSERT INTO products (title, description, price, imageUrl) values(?, ?, ?, ?)', [
      this.title,
      this.description, 
      this.price, 
      this.imageUrl
    ]).then( (data) => {

    }).catch(err => console.log(err));
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    return db.execute("SELECT * FROM products").then(data => {
        cb(data[0])
    });
    // getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
