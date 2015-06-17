'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  members: [
    {
      name: String,
      checkin: Date,
      checkout: Date
    }
  ],
  topics: [
    {
      title: String,
      heading: {
        type: String,
        enum: [
          'Follow-ups',
          'New Items'
        ]
      },
      notes: String,
      status: String,
      assignments: []
    }
  ]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
