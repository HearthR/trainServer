var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
var fs = require('fs');

// let db_config = require('../config/db-config.json');
// let conn = mysql.createConnection(db_config);

// conn.connect();

// let connection_closer = function(next) {
//   conn.end();
//   next();
// };

// let list_sql = `SELECT stations.ID, Name, line_num, IFNULL(coord_x, 0) as coord_x, IFNULL(coord_y, 0) as coord_y, coord2_x, coord2_y 
//                 FROM stations 
//                 LEFT JOIN coordinate 
//                 ON stations.ID = coordinate.ID 
//                 ORDER BY stations.ID ASC`;

// let neighbors_sql = `SELECT ID_from, ID_to, Cost
//                     FROM neighbors
//                     ORDER BY ID_from ASC, ID_TO ASC`;

/* GET home page. */
router.get('/', function(req, res, next) {
  // conn.query(neighbors_sql, (err, rows) => {
  //   if(err) {
  //     console.log(err);
  //   }
  //   else {
  //     let jsonData = {};
  //     for(let i = 0; i < rows.length; i++) {
  //       let rowObj = {ID_from : rows[i].ID_from,
  //                     ID_to : rows[i].ID_to,
  //                     Cost : rows[i].Cost};
  //       jsonData[String(i)] = rowObj;
  //     }
  //     fs.writeFile('public/resources/neighborData.json', JSON.stringify(jsonData), 'utf8', (err) => {
  //       if(err) {
  //         console.log(err);
  //       }
  //     });
  //   }

  // });
  
  res.render('index');
});

router.get('/data/stations', function(req, res, next) {
  fs.readFile('../public/resources/stationData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/data/neighbors', function(req, res, next) {
  fs.readFile('../public/resources/neighborData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send(data);
    }
  });
});


// router.use(connection_closer);

module.exports = router;
