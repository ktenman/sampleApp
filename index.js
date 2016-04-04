var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

// and after the app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'))

mongoose.connect(config.db);

var topics = require('./routes/topics');

// after app declaration
app.use('/api/topics', topics);


app.get('/api/', function(req, res){
    console.log('Somebody visited /api');
    res.json({"success": "Tere tulemast!"});
});

app.listen(3000, function(){
    console.log('App started on port 3000!');
});

app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.error("["+(err.status || 500)+"] "+(new Date).toString()+" "+req.url +' '+ err);
    var message = err.status == 404 ? err.message : "Unknown error";
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: message //should by default hide in production
    });
});

//kostik();

process.on('uncaughtException', function (err) {
    console.error((new Date).toString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
});