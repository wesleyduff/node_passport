var Demo = require('../models/demo.server.model.js');
var Projects = require('../models/project.server.model.js');
var User = require('../models/users.server.model.js');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

function handleErr(err){
    console.log('//////////// - ERROR :(');
    console.log(err);
    //res.redirect(301, '/demo');
}

exports.getLogin = function(req, res) { 
    res.render('login', {title : 'Demo App : login using passport'});
};

exports.getRegistration = function(req, res){
    res.render('registration', {title : 'Demo App : Registration '});
};

exports.doRegister = function(req, res){
    console.log(req.body);
    var _username = req.body.username;
    if(req.body.password1 === req.body.password2){
        var _password = req.body.password1;
    } else {
        res.redirect('/login');
    }
    
    
    var user = new User({
        username : _username,
        password : _password
    });
    
    user.save(function(err, user){
       if(err){ handleErr(err); }
       res.redirect('/user/' + user._id);
    });
};
//Set up passport authentication
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({ username: username }, 
      function(err, user){
        if(err) { return done(err); }
        if(!user) {
          return done(null, false, {message : 'Incorrect username.' });
        }
        if(!user.validPassword(user.password, password)){
          return done(null, false, {message : 'Incorrect password.' });
        }
        return done(null, user);
      }); 
  }
));