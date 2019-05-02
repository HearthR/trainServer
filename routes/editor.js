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

var list_sql = 'SELECT ID, Name, line_num, coord_x, coord_y FROM stations NATURAL JOIN coordinate';

const updateCoord = (queryStr) => {
  conn.query(queryStr, function(error, results, field) {
    if(error) console.log(error);
    else {
      //console.log(results);
    }
  });
};

const checkEmptyResult = (resultObj) => {
  for(let key in Object.keys(resultObj)) {
    if(resultObj.hasOwnProperty(key)) {
      console.log(resultObj.valueOf(key));
      console.log('property');
      return false;
    }
  }
  return true;
};

/* GET editor home */
router.get('/', function(req, res, next) {

  conn.query(list_sql, function(err, rows, fields) {
    if(!err)
      res.render('editor', {stations:rows});
    else
      console.log(err);
  });

});

router.post('/', function(req, res, next) {
  let coord_x = Number(req.body.coord_x);
  let coord_y = Number(req.body.coord_y);
  let coord_id = Number(req.body.id);
  if(coord_id && coord_x && coord_y) {
    let coord_sql = mysql.format('UPDATE coordinate SET coord_x = ?, coord_y = ? WHERE ID = ?', [coord_x, coord_y, coord_id]);
    let check_sql = mysql.format('SELECT ID from coordinate where ID = ?', [coord_id]);
    conn.query(check_sql, function(error, results, field) {
      console.log(typeof(results));
      console.log(results);
      if(error) console.log(error);
      else {
        if(checkEmptyResult(results)) {
          console.log('after checkEmpty');
          let init_sql = mysql.format('INSERT INTO coordinate VALUES (?, ?, ?)', [coord_id, 0, 0]);
          conn.query(init_sql, function(error, results, field) {
            if(error) console.log(error);
            else {
              updateCoord(coord_sql);
            }
          });
        }
        else {
          updateCoord(coord_sql);
        }
        res.send('success');
      }
    });
  }
  else {
    res.sendStatus(404).send('Wrong format');
  }
});

router.use(connection_closer);

module.exports = router;