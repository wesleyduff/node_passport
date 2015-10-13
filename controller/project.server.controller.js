var Project = require('../models/project.server.model.js');
function handleErr(err){
    console.log('//////////// - ERROR :(');
    console.log(err);
}
exports.create = function(req, res){
    var entry = new Project({
        title : req.body.projectTitle,
        type : req.body.projectType
    });
    console.log(entry);
    entry.save(function(err, result){
        if(err){
            handleErr(err);
            res.redirect(301, '/projects');
        } 
        console.log('//// - result ');
        console.log(result);
        res.redirect(301, '/projects');
    });
    
};

exports.getProject = function(req, res) { 
    Project.find(function(err, projectResults){
       if(err){
           handleErr(err);
           res.redirect(301, '/projects');
       } 
        res.render('projects', {title : 'Demo App : Projects', projects : projectResults});
    });
   
};