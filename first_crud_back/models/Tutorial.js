var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tutorial 스키마 정의
var TutorialSchema = new Schema({
    title: String,
    description: String,
    published: Boolean
},
{ timestamps: true });

module.exports = mongoose.model('Tutorial', TutorialSchema);