'use strict';

var _ = require('lodash');
var Meeting = require('./meeting.model.js');

// Get list of meeting members
//exports.index = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .populate('members')//
//    .select('members')//
//    .exec(function (err, meeting) {
//      if (err) { return handleError(res, err); }
//      return res.status(200).json(meeting.members);
//    });
//};
//
//// Get a single meeting
//exports.show = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .populate('members')//
//    .exec(function (err, meeting) {
//      if (err) { return handleError(res, err); }
//      if (!meeting) { return res.send(404); }
//      return res.json(meeting);
//    });
//};

// Creates a new member in the DB.
exports.create = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('members')//
    .select('members')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      var member = _.first(meeting.members.addToSet(req.body));

      meeting.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('meeting.member.controller  ', 'member: ', member);
        return res.status(201).json(member);
      });
    });
};

// Updates an existing member in the DB.
exports.update = function (req, res) {

  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('members')//
    .select('members')//
    .exec(function (err, meeting) {
      var member = meeting.members.id(req.params.member);
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      _.merge(member, req.body);
      meeting.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('meeting.member.controller  ', 'member: ', member);
        return res.status(200).json(member);
      });
    });
};
//
//// Deletes a meeting from the DB.
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
