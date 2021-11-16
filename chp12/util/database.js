const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://course:course@cluster0.osoy1.mongodb.net/shop?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let _db; 

const mongoConnect = callback => {
  client.connect()
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw "No database connection";
}

exports.connect = mongoConnect;
exports.getDb = getDb;