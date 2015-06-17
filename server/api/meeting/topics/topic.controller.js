'use strict';

var _ = require('lodash');
var Meeting = require('./../meeting.model.js');

// Get list of meetings
exports.index = function (req, res) {
  Meeting.findById(req.params.id)//
    .populate('topics')//
    .select('topics')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      return res.json(200, meeting.topics);
    });
};

// Get a single meeting
//exports.show = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .select('topics')//
//    .exec(function (err, meeting) {
//      if (err) { return handleError(res, err); }
//      if (!meeting) { return res.send(404); }
//      return res.json(meeting);
//    });
//};

// Creates a new meeting in the DB.
//exports.create = function (req, res) {
//  Meeting.create(req.body, function (err, meeting) {
//    if (err) { return handleError(res, err); }
//    return res.json(201, meeting);
//  });
//};

// Updates an existing meeting item in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('topics')//
    .select('topics')//
    .exec(function (err, meeting) {
      var topic = meeting.topics.id(req.params.topic);
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      _.merge(topic, req.body);
      meeting.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, meeting);
      });
    });
};

// Deletes a meeting from the DB.
//exports.destroy = function (req, res) {
//  Meeting.findById(req.params.id, function (err, meeting) {
//    if (err) { return handleError(res, err); }
//    if (!meeting) { return res.send(404); }
//    meeting.remove(function (err) {
//      if (err) { return handleError(res, err); }
//      return res.send(204);
//    });
//  });
//};

function handleError(res, err) {
  return res.send(500, err);
}
