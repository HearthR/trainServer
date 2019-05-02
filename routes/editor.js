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

var list_sql = `SELECT stations.ID, Name, line_num, IFNULL(coord_x, 0) as coord_x, IFNULL(coord_y, 0) as coord_y 
                FROM stations 
                LEFT JOIN coordinate 
                ON stations.ID = coordinate.ID 
                ORDER BY stations.ID ASC`;

const updateCoord = (queryStr, res) => {
  conn.query(queryStr, function(error, results, field) {
    if(error) console.log(error);
    else {
      console.log(results);
      res.send("Set coordinate success");
    }
  });
};

const checkEmptyResult = (resultObj) => {
  for(let key in Object.keys(resultObj)) {
    if(resultObj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/* GET editor home */
router.get('/', function(req, res, next) {
  conn.query(list_sql, function(err, rows, fields) {
    if(!err) {
      res.render('editor', {stations:rows});
    }
    else
      console.log(err);
  });
});

router.post('/', function(req, res, next) {
  let coord_x = Number(req.body.coord_x);
  let coord_y = Number(req.body.coord_y);
  let coord_id = Number(req.body.id);
  if(!isNaN(coord_id) && !isNaN(coord_x) && !isNaN(coord_y)) {
    let coord_sql = mysql.format('UPDATE coordinate SET coord_x = ?, coord_y = ? WHERE ID = ?', [coord_x, coord_y, coord_id]);
    let check_sql = mysql.format('SELECT ID from coordinate where ID = ?', [coord_id]);
    conn.query(check_sql, function(error, results, field) {
      if(error) {
         console.log(error);
      }
      else {
        if(checkEmptyResult(results)) {
          let init_sql = mysql.format('INSERT INTO coordinate VALUES (?, ?, ?)', [coord_id, 0, 0]);
          conn.query(init_sql, function(error, results, field) {
            if(error) {
              console.log(error);
            }
            else {
              updateCoord(coord_sql, res);
            }
          });
        }
        else {
          updateCoord(coord_sql, res);
        }
      }
    });
  }
  else {
    res.sendStatus(404).send('Wrong format');
  }
});

router.use(connection_closer);

module.exports = router;
