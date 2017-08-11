var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


router.get('/', function (req, res) {
    console.log('hit get route')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM koalas;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
});

router.post('/', function (req, res) {
    console.log('hit post route');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO koalas ( name, gender, age, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5)',[req.body.name, req.body.gender, req.body.age, req.body.readyForTransfer, req.body.notes], function (errorMakingQuery, result) {
                done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                })
        }

    })

});
/*
router.put('/', function (req, res){
    console.log('put route hit')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('UPDATE ')
})
*/

module.exports = router;