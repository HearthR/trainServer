var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db_config = require('../config/db-config.json');
var conn = mysql.createConnection(db_config);

conn.connect();

var connection_closer = function(next) {
  conn.end();
  next();
};

var list_sql = 'SELECT * FROM stations';

/* GET editor home */
router.get('/', function(req, res, next) {

  conn.query(list_sql, function(err, rows, fields) {
    if(!err)
      //res.send(rows);
      res.render('editor', {stations:rows});
    else
      console.log(err);
  });

});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send(req.body.coord_x);
});

router.use(connection_closer);

module.exports = router;