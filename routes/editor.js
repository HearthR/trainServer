var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let db_config = require('../config/db-config.json');
let conn = mysql.createConnection(db_config);

conn.connect();

let connection_closer = function(next) {
  conn.end();
  next();
};

let list_sql = `SELECT stations.ID, Name, line_num, IFNULL(coord_x, 0) as coord_x, IFNULL(coord_y, 0) as coord_y, coord2_x, coord2_y 
                FROM stations 
                LEFT JOIN coordinate 
                ON stations.ID = coordinate.ID 
                ORDER BY stations.ID ASC`;

let neighbors_sql = `SELECT ID_from, ID_to, Cost
                    FROM neighbors
                    ORDER BY ID_from ASC, ID_TO ASC`;

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
      listSqlCallback(res, rows);
    }
    else
      console.log(err);
  });
});

const listSqlCallback = (res, stationList) => {
  conn.query(neighbors_sql, function(err, neighborList, fields) {
    if(!err) {
      let neighborIndex = 0;

      for(let i = 0; i < stationList.length; i++) {
        if(!stationList[i].hasOwnProperty('Neighbors')) {
          stationList[i].Neighbors = "";
        }
        for(let j = neighborIndex; j < neighborList.length; j++) {
          if(stationList[i].ID === neighborList[j].ID_from) {
            if(!stationList[i].Neighbors) {
              stationList[i].Neighbors += String(neighborList[neighborIndex].ID_to)+'/'+String(neighborList[neighborIndex].Cost);
            }
            else {
              stationList[i].Neighbors += ',' + String(neighborList[neighborIndex].ID_to)+'/'+String(neighborList[neighborIndex].Cost);
            }
            neighborIndex += 1;
          }
          else break;
        }
      }
      res.render('editor', {stations:stationList});
    }
    else  console.log(err);
  });
};

router.post('/', function(req, res, next) {
  let coord_x = Number(req.body.coord_x);
  let coord_y = Number(req.body.coord_y);
  let coord_id = Number(req.body.id);
  if(!isNaN(coord_id) && !isNaN(coord_x) && !isNaN(coord_y)) {
    let coord_sql;
    if(req.body.column === "coord2") {
      coord_sql = mysql.format('UPDATE coordinate SET coord2_x = ?, coord2_y = ? WHERE ID = ?', [coord_x, coord_y, coord_id]);
    }
    else {
      coord_sql = mysql.format('UPDATE coordinate SET coord_x = ?, coord_y = ? WHERE ID = ?', [coord_x, coord_y, coord_id]);
    }
    let check_sql = mysql.format('SELECT ID from coordinate where ID = ?', [coord_id]);
    conn.query(check_sql, function(error, results, field) {
      if(error) {
         console.log(error);
      }
      else {
        if(checkEmptyResult(results)) {
          let init_sql = mysql.format('INSERT INTO coordinate VALUES (?, ?, ?, NULL, NULL)', [coord_id, 0, 0]);
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
