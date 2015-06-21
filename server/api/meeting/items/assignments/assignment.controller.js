'use strict';

var _ = require('lodash');
var Meeting = require('./../../meeting.model.js');

// Get list of meetings
//exports.index = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .populate('assignments')//
//    .select('assignments')//
//    .exec(function (err, meeting) {
//      if (err) { return handleError(res, err); }
//      return res.json(200, meeting.assignments);
//    });
//};

// Get a single meeting
//exports.show = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .select('assignments')//
//    .exec(function (err, meeting) {
//      if (err) { return handleError(res, err); }
//      if (!meeting) { return res.send(404); }
//      return res.json(meeting);
//    });
//};

// Creates a new meeting in the DB.
exports.create = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .select('items._id items.assignments')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }


      var item = meeting.items.id(req.params.item);


      var assignment = req.body;

      item.assignments.push(assignment);

      meeting.save(function (err) {
        if (err) { return handleError(res, err); }

        return res.json(201, assignment);

      });
    });
};

// Updates an existing meeting assignment in the DB.
//exports.update = function (req, res) {
//  if (req.body._id) { delete req.body._id; }
//  Meeting.findById(req.params.id)//
//    .populate('assignments')//
//    .select('assignments')//
//    .exec(function (err, meeting) {
//      var assignment = meeting.assignments.id(req.params.assignment);
//      if (err) { return handleError(res, err); }
//      if (!meeting) { return res.send(404); }
//      _.merge(assignment, req.body);
//      meeting.save(function (err) {
//        if (err) { return handleError(res, err); }
//        return res.json(200, meeting);
//      });
//    });
//};

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
  console.log('assignment.controller  ', 'err: ', err);
  return res.send(500, err);
}
