const http = require("http");
const express = require("express");

const app = express();

app.use("/users", (_, res, next) => {
    res.send("<h1>Welcome to users<h1>");
});

app.use("/", (_, res, next) => {
    res.send("<h1>Welcome to home page</h1>");
});


app.listen(5000);