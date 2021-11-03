const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require("express-handlebars");

const app = express();

// has support no need to import
app.set("view engine", "ejs");

// this name will be the extension
// app.engine("hbs", expressHbs({layoutsDir: "views/layout/", defaultLayout: "main", extname: "hbs"}));
// app.set("view engine", "hbs");

// pug auto registers with express
// app.set("view engine", "pug");

// default is /views
app.set("views", "views");

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render("404", { layout: false, docTitle: "404 Page not found" });
});

app.listen(3000);
