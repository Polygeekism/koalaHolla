var express = require('express');
var router = express.Router();
var pool = require ('../modules/pool');


router.get('/', function(req, res){
    console.log('hit get route')
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM koalas;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
});

router.post('/', function(req, res){
    console.log('hit post route')

});


module.exports = router;