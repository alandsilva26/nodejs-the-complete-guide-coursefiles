const express = require("express");
const path = require("path");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

// same path with diff methods
// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {

});

module.exports = router;