"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");
var ruta = path.resolve(__dirname, "../dist/index.html");
console.log(process.env.NODE_ENV);
app.get("/hola", function (req, res) {
    console.log(ruta);
    res.json({
        message: ruta
    });
});
app.get("/env", function (req, res) {
    res.json({
        environment: process.env.NODE_ENV
    });
});
app.get("/env", function (req, res) {
    console.log(ruta);
    res.json({
        env: process.env.NODE_ENV
    });
});
app.use(express.static("dist"));
app.get("*", function (req, res) {
    // MODIFICAR RUTA PARA TOMAR EL DIST FUERA DE LA CARPETA SERVER
    res.sendFile(ruta);
});
app.listen(port, function () {
    console.log("app corriendo en el puerto " + port);
});
