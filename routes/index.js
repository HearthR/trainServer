var express = require('express');
var router = express.Router();
var fs = require('fs');


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



module.exports = router;
