const mongodb = require('mongodb');
const { connect, getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id); 
  }

  save() {
    const db = getDb();
    if (this._id) {
      // update product
      return db.collection('products').updateOne({
        _id: this._id 
      }, {
        $set:
          this
      }).then().catch();
    }
    else {
      return db.collection("products").insertOne(this).then(result => console.log(result)).catch(err => console.log(err));
    }
  }

  static fetchAll() {
    const db = getDb();
    // find returns cursor
    return db.collection("products").find().toArray().then(products => products).catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({
      _id: new mongodb.ObjectId(prodId)
    }).next().then(product => product).catch();
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').find({
      _id: new mongodb.ObjectId(prodId) 
    }).then(result => result).catch();
  }
}

module.exports = Product;