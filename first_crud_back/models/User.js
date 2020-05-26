var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tutorial 스키마 정의
var UserSchema = new Schema({
    email : String,
    password: String,
    name: String,
    snsId: String,
    provider: String
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);