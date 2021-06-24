var express = require('express');
var router = express.Router();

//메인 페이지 라우팅 메소드
//http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
