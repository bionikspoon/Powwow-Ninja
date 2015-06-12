'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        default: 'MEMBER'
      }
    }
  ]
});

module.exports = mongoose.model('Group', GroupSchema);
