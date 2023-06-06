'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var env = "prod";
var port = "4003";

console.log("Port:" + port + "env:" + env);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var routes = require('./app/routes');
routes(app);

//listening on port
app.listen(port, function () {
    console.log('Supplier ' + env + ' apis started on port: ' + port);
});