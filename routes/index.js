var express = require('express');
var router = express.Router();
var cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cats: cats });
});

module.exports = router;
