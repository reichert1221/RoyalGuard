// Server.js

// Modules
var express = require("express");
var morgan = require("morgan");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
//var mongoose = require("mongoose");
var port = process.env.PORT || 8080;
var app = express();
var router = express.Router();

// MongoDB setup
/*
var db = require("./server/config/db");
mongoose.connect(db.url);
require("./server/config/schema");
*/

// Configuration
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(methodOverride());
app.use(morgan("dev"));

// Routes
require("./server/config/routes")(app, router);

// Start app
app.listen(port);
console.log("Listening on port: " + port);
exports = module.exports = app;
