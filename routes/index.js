var express = require('express');
var router = express.Router();
var cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
 // middleware that is specific to this router
 
  res.render('index', { title: 'Welcome To Cat Shelter', cats: cats });
});

module.exports = router;
