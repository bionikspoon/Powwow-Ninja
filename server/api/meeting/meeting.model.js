'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AssignmentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
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
  members: ['Member'],
  items: [ItemSchema]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
