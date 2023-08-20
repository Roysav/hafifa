"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello Avidor');
});
app.listen(port, function () {
    console.log("Express app started at port ".concat(port));
});
//# sourceMappingURL=index.js.map