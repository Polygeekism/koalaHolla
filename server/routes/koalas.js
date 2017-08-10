var express = require('express');
var router = express.Router();
var pool = require ('../modules/pool');


router.get('/', function(req, res){
    console.log('hit get route')
});

router.post('/', function(req, res){
    console.log('hit post route')

});


module.exports = router;