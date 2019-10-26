var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* index페이지의 /data/stations ajax 요청을 핸들링합니다. */
router.get('/data/stations', function(req, res, next) {
  /* public/resources/stationData.json의 전체 데이터를 읽어서 response에 담아 클라이언트로 전송 */
  fs.readFile('public/resources/stationData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json(JSON.parse(data));
    }
  });
});

/* index페이지의 /data/neighbors ajax 요청을 핸들링합니다. */
router.get('/data/neighbors', function(req, res, next) {
    /* public/resources/neighborData.json의 전체 데이터를 읽어서 response에 담아 클라이언트로 전송 */
  fs.readFile('public/resources/neighborData.json', (err, data) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json(JSON.parse(data));
    }
  });
});



module.exports = router;
