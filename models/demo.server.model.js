var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('../models/project.server.model.js');

var demoSchema = new Schema({
    name : String,
    project : [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    createdOn : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Demo', demoSchema, 'Demos');