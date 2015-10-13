var Demo = require('../models/demo.server.model.js');
var Projects = require('../models/project.server.model.js');
var User = require("../models/users.server.model.js");

function handleErr(err){
    console.log('//////////// - ERROR :(');
    console.log(err);
    //res.redirect(301, '/demo');
}

exports.getUser = function(req, res) { 
    if(req.session.passport && req.session.passport.user){
        User.findById(req.params.userID).exec(function(err, user){
            if(err){
               handleErr(err);
               res.redirect(301, '/login');
            }
            res.render('user', {title : 'Demo App : User', user : user});
        });
    } else {
        res.redirect('/login');
    }

    
};