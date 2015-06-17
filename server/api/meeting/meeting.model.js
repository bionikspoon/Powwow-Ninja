'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  members: [
    {
      name: String
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
      ]
    }
  ]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
