var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var resString = "Requested time : " + req.requestTime + '';
  res.send(resString);
});

module.exports = router;
