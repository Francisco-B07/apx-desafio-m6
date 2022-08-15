"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
app.use(express.static("dist"));
app.get("/hola", function (req, res) {
    res.json({
        message: "Hola soy el servidor"
    });
});
app.get("/env", function (req, res) {
    res.json({
        environment: process.env.NODE_ENV
    });
});
app.use(express.static("../dist"));
app.get("/env", function (req, res) {
    res.json({
        env: process.env.NODE_ENV
    });
});
app.listen(port, function () {
    console.log("app corriendo en el puerto " + port);
});
