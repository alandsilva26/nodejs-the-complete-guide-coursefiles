const http = require("http");
const express = require("express");

const app = express();

// this will execute for all requests (middleware)
// next is function that will call next middleware
app.use((req, res, next) => {

});

const server = http.createServer(app);

server.listen(5000);