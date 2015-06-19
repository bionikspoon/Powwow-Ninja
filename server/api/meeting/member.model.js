'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  name: String,
  checkin: Date,
  checkout: Date
});

module.exports = mongoose.model('Member', MemberSchema);
