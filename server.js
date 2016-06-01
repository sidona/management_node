/**
 * Created by sdonose on 5/30/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
require('./app/model/customer.js');
require('./app/model/product.js');
require('./app/model/order.js');
var customer = require('./app/routes/routes-customer');
var order = require('./app/routes/routes-order');
var product = require('./app/routes/routes-product');


// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
app.set("view engine", "jade");

var port = process.env.PORT || 3000; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gestiune'); // connect to our database


app.use('/api', product);
app.use('/api', customer);
app.use('/api', order);


app.listen(port);
console.log('listen port ' + port);