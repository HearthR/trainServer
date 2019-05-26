var pool = require('../pool/pool.js')
var fs = require('fs');


let list_sql = `SELECT stations.ID, Name, line_num, IFNULL(coord_x, 0) as coord_x, IFNULL(coord_y, 0) as coord_y, coord2_x, coord2_y 
                FROM stations 
                LEFT JOIN coordinate 
                ON stations.ID = coordinate.ID 
                ORDER BY stations.ID ASC`;

let neighbors_sql = `SELECT ID_from, ID_to, Cost, Congestion
                    FROM neighbors
                    ORDER BY ID_from ASC, ID_TO ASC`;

let neighbors_minmax_sql = `SELECT MAX(Congestion) AS Max, MIN(Congestion) AS Min FROM neighbors`;
  


const genJsonData = () => {
  pool.query(neighbors_minmax_sql, (err, result) => {
    if(err) {
      console.log(err);
    }
    else {
      pool.query(neighbors_sql, (err, rows) => {
        if(err) {
          console.log(err);
        }
        else {
          let jsonData = {};
          let divisor = Number(result[0].Max) - Number(result[0].Min);
          let minVal = Number(result[0].Min);
          console.log(divisor);
          console.log(minVal);
          for(let i = 0; i < rows.length; i++) {
            let calc = (Number(rows[i].Congestion) - minVal) / divisor;
            let rowObj = {ID_from : rows[i].ID_from,
                          ID_to : rows[i].ID_to,
                          Cost : rows[i].Cost,
                          Congestion : calc};
            jsonData[String(i)] = rowObj;
          }
          fs.writeFile('../../public/resources/neighborData.json', JSON.stringify(jsonData), 'utf8', (err) => {
            if(err) {
              console.log(err);
            }
          });
        }
      });
    }
  });


};

genJsonData();