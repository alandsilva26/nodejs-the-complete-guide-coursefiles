const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // alternative way
  Product.findAll({ where: { id: prodId } }).then().catch();

  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {

  req.user.getCart().then(cart => {
    cart.getProducts().then(products => {
      return res.render('/shop/cart', {
        path: "/cart",
        pageTitle: "Your cart",
        products: products,
      });
    });
  }).catch();
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let cart;

  req.user.getCart(
    cart => {
      cart = cart;
      return cart.getProducts({ where: { id: prodId } });
    }
  )
    .then(products => {
      let product;
      if(products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if(product) {
        // ...
      }

      return Product.findByPk(prodId).then(
        product => {
          return  
        }
      ).catch();
    })
    .catch();

  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
