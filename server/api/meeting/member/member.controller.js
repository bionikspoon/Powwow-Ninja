'use strict';

var _ = require('lodash');
var Meeting = require('./../meeting.model.js');

//// Get list of meeting members
exports.index = function (req, res) {
  Meeting.findById(req.params.id)//
    .populate('members')//
    .select('members')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      return res.json(200, meeting.members);
    });
};
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
  console.log('member.controller    ', 'req.body: ', req.body);
  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('members')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }

      meeting.members.push(req.body);

      meeting.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, meeting.members);
      });
    });
};

// Updates an existing member in the DB.
exports.update = function (req, res) {

  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('members')//
    .exec(function (err, meeting) {
      var member = meeting.members.id(req.params.member);
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      member = _.merge(member, req.body);
      meeting.save(function (err, obj) {
        console.log('member.controller    ', 'obj: ', obj);
        if (err) { return handleError(res, err); }
        return res.json(200, meeting);
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
