const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

// express doesnt parse body by default and will return undefined
// 3rd party body parser is required
// app.use(bodyParser.urlencoded({ extended: true }));

// body parse is depecrated 
app.use(express.urlencoded());

// custom middleware filter
app.use("/test", (req, res, next) => {
    res.send("Hello from test");
});

// will only trigger for post requests
app.post("/product", (req, res, next) => {
    console.log(req.body);

    res.redirect("/");
});

// this will execute for all requests (middleware)
// next is function that will call next middleware
// takes path(or regex as arg) to execute conditionally
app.use("/", (req, res, next) => {
    res.send("<form action='/product' method='POST'><input type='text' placeholder='Enter name' name='title' /><button type='submit'>Submit</button></form>");
});

// this will not be executed as the above middleware will be called(as path matches)
// needs to be at top
app.use("/lemon", (req, res, next) => {
    res.send("<h1>HELLO FROM LEMON</h1>");
})


// internally calls createServer and listen
app.listen(5000);

// const server = http.createServer(app);
// server.listen(5000);