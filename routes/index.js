var express = require('express');
var router = express.Router();
var demoController = require('../controller/demo.server.controller.js');
var projectController = require('../controller/project.server.controller.js');
var loginCtrl = require('../controller/login.server.controller.js');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get Demo */
router.get('/demo', function(req, res){
    return demoController.getDemo(req, res);
});

/* POST new demo */
router.post('/demo', function(req, res){
    return demoController.create(req, res);
});

/* Get Projects */
router.get('/projects', function(req, res){
   return projectController.getProject(req, res); 
});
/* Post Project */
router.post('/projects', function(req, res){
    return projectController.create(req, res);
});

/*LOGIN*/
router.get('/login', function(req, res){
   return loginCtrl.getLogin(req, res); 
});
router.post('/login', 
    passport.authenticate('local'),
    function(req, res) {
        req.session.user = req.user;
        req.session.save(function(err){
           if(err){
               console.log('ERROR SAVING SESSION');
           } 
        });
        console.log(req.session);
        // if this function gets called, authentication was successful
        //'req.user' contains the authenticated user.
        res.redirect('/users/' + req.user._id);
    }
);
router.get('/register', function(req, res){
   return loginCtrl.getRegistration(req, res); 
});
router.post('/register', function(req, res){
    return loginCtrl.doRegister(req, res);
})


module.exports = router;
