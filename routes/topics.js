var express = require('express');
var router = express.Router();

var Topic = require('../models/topic').Topic;

// POST /api/topics/create
router.post('/create/', function(req, res, next) {

    var params = req.body;

    console.log(params);

    if(params.topicName){

        var topicObject = {
            name: params.topicName  
        };

        var newTopic = new Topic(topicObject);
        newTopic.save(function(err, entry) {

            //handle saving error
            if(err){ return res.json(err); }

            //return saved entry
            res.json({"successs": entry});
        });

    }else{
        //if missing parameters returs error
        res.status(500).send({ error: 'missing parameters' });
    }

});

//..add others HERE

module.exports = router;