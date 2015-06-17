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
      items: [
        {
          title: String,
          notes: String,
          assignments: [],
          status: String
        }
      ],
      heading: {
        type: String,
        enum: [
          'Follow-ups',
          'New Items'
        ]
      }
    }
  ]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
