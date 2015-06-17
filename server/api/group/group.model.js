'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      joined: {
        type: Date,
        default: Date.now
      },
      role: {
        type: String,
        default: 'MEMBER',
        enum: [
          'MEMBER',
          'SENSEI'
        ]
      }
    }
  ],
  meetings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meeting'
    }
  ],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

module.exports = mongoose.model('Group', GroupSchema);
