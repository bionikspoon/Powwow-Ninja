'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  meetingDate: Date,
  'created_at': {
    type: Date,
    default: Date.now
  },
  'updated_at': {
    type: Date,
    default: Date.now
  },
  attendance: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      rsvp: {
        date: Date,
        status: String
      },
      checkin: Date,
      checkout: Date
    }
  ],
  resources: [
    {
      name: String,
      url: String
    }
  ],
  agenda: [
    {
      title: String,
      status: String,
      assignments: [
        {
          title: String,
          owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          },
          notes: [
            {
              author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
              },
              content: String
            }
          ],
          status: String
        }
      ]
    }
  ],
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }
});

module.exports = mongoose.model('Meeting', MeetingSchema);
