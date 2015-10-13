var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Demo = require('../models/demo.server.model.js');

var projectSchema = new Schema({
    title : String,
    type : {type : String, default : "Web"},
    demo : { type: String, ref: 'Demo' }
});

module.exports = mongoose.model('Project', projectSchema);