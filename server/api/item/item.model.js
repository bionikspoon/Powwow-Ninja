'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
  title: String,
  'opened_at': {
    type: Date,
    default: Date.now
  },
  'updated_at': {
    type: Date,
    default: Date.now
  },
  'closed_at': Date,
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  log: []
});

var ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  'opened_at': {
    type: Date,
    default: Date.now
  },
  'updated_at': {
    type: Date,
    default: Date.now
  },
  'closed_at': Date,
  notes: String,
  status: {
    type: String,
    default: 'NEW',
    enum: [
      'NEW',
      'OPEN',
      'CLOSED',
      'SNOOZED',
      'ASSIGNED'
    ]
  },
  assignments: [AssignmentSchema],
  log: []
});

module.exports = mongoose.model('Item', ItemSchema);
