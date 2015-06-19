'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MemberSchema = new Schema({
  name: String,
  checkin: Date,
  checkout: Date
});

var AssignmentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: MemberSchema
  },
  description: String,
  opened: Date,
  closed: Date
});
var ItemSchema = new Schema({
  title: String,
  section: {
    type: String,
    enum: [
      'Follow-ups',
      'New Items'
    ]
  },
  notes: String,
  status: String,
  assignments: [AssignmentSchema]
});


var MeetingSchema = new Schema({
  members: [MemberSchema],
  items: [ItemSchema]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
