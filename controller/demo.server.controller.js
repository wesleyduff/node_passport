var Demo = require('../models/demo.server.model.js');
var Projects = require('../models/project.server.model.js');

function handleErr(err){
    console.log('//////////// - ERROR :(');
    console.log(err);
    //res.redirect(301, '/demo');
}
exports.create = function(req, res){
    console.log('id : ' + req.body.project);
    var _project = Projects.findById(req.body.project).exec(function(err, returnProject){
        if(err){
            handleErr(err);
            res.redirect(301, '/demo');
        }
        console.log('title =-=---=-=-=-=- ' + returnProject.title);
        var entry = new Demo({
            name : req.body.demoName,
            project : returnProject._id
        });
        entry.save(function(err, result){
            if(err){
                handleErr(err);
            } 
            console.log('//// - result ');
            console.log(result);
        });
        res.redirect('/demo');
    });
     
};

exports.getDemo = function(req, res) { 
    var demos = [];
    Demo.find().populate('project').exec(function(err, demoResults){
       if(err){
           handleErr(err);
           res.redirect(301, '/demo');
       }
       console.log('demo res project ' + demoResults[0].project[0].title);
       Projects.find(function(err, projectResults){
           if(err){
               handleErr(err);
               res.redirect(301, '/demo');
           }
           res.render('demo', {title : 'Demo App : Mongoose', demos : demoResults, projects : projectResults });
       });
       
    });
    
};