var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.server.controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
