var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : String,
    password : {type: String},
    createdOn : {type: Date, default: Date.now}
});

userSchema.methods.validPassword = function( userPassword, passPassword ) {
    console.log("pwd param : " + passPassword);
    console.log('password obj : ' + userPassword);
    console.log(userPassword);
    return ( userPassword === passPassword );
};

module.exports = mongoose.model('User', userSchema);