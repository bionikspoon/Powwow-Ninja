'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  checkin: {
    type: Date,
    default: Date.now
  },
  checkout: Date,
  rsvp: {
    date: Date,
    attending: Boolean
  }
});

var MeetingSchema = new Schema({
  date: Date,
  location: String,
  attendance: [AttendanceSchema]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
