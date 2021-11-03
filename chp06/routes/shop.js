const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require("./admin");

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { docTitle: "Shop", hasProducts: products.length > 0, products: products, path: "/", activeShop: true });
});

module.exports = router;
