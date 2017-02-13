var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my api');
});

app.listen(port, function() {
    console.log("Running on http://localhost:" + port);
});
