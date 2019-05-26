var express = require('express');
var router = express.Router();
var fs = require('fs');

// var pool = require('../lib/pool/pool.js');


// let pair_sql = `SELECT ID_from, ID_to, Total
//                 FROM congestion
//                 ORDER BY ID_from ASC, ID_to ASC`;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/data/stations', function(req, res, next) {
  fs.readFile('public/resources/stationData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/data/neighbors', function(req, res, next) {
  fs.readFile('public/resources/neighborData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send(data);
    }
  });
});

// router.get('/pairs', function(req, res, next) {
//   pool.query(pair_sql, (err, rows) => {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       res.send(rows);
//     }
//   });

// });


module.exports = router;
