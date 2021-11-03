const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "views");

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
    res.render("index", {pageTitle: "Home"});
});

router.post("/users", (req, res, next) => {
    users.push(req.body);
    res.redirect("users");
});

router.get("/users", (req, res, next) => {
    console.log(users);
    res.render("users", {pageTitle: "Users", users: users });
})

app.use(router);

app.listen(3000);