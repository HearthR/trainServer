var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
// var fs = require('fs');

// let db_config = require('../config/db-config.json');
// let conn = mysql.createConnection(db_config);

// conn.connect();

// let connection_closer = function(next) {
//   conn.end();
//   next();
// };

let list_sql = `SELECT stations.ID, Name, line_num, IFNULL(coord_x, 0) as coord_x, IFNULL(coord_y, 0) as coord_y, coord2_x, coord2_y 
                FROM stations 
                LEFT JOIN coordinate 
                ON stations.ID = coordinate.ID 
                ORDER BY stations.ID ASC`;

let neighbors_sql = `SELECT ID_from, ID_to, Cost
                    FROM neighbors
                    ORDER BY ID_from ASC, ID_TO ASC`;

/* GET home page. */
router.get('/', function(req, res, next) {
  // conn.query(list_sql, (err, rows) => {
  //   fs.open('public/resources/metroData.json', 'a', (err, id) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //     else {
  //     }
  //   });
  //   //for(let i = 0; i < rows.length; )
  //   //console.log(rows.length);
  // });
  
  res.render('index');
});


// router.use(connection_closer);

module.exports = router;
