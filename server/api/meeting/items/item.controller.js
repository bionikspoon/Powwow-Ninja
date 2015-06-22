'use strict';

var _ = require('lodash');
var Meeting = require('./../meeting.model.js');

// Get list of items
exports.index = function (req, res) {
  Meeting.findById(req.params.id)//
    .select('items')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(meeting.items);
    });
};

// Get a single meeting
//exports.show = function (req, res) {
//  Meeting.findById(req.params.id)//
//    .select('items')//
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
    .populate('items')//
    .select('items')//
    .exec(function (err, meeting) {
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      var item = req.body;
      item.section = 'New Items';
      item = meeting.items.addToSet(req.body)[0];

      item.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(item);

      });
    });
};

// Updates an existing meeting item in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id)//
    .populate('items')//
    .select('items')//
    .exec(function (err, meeting) {
      var item = meeting.items.id(req.params.item);
      if (err) { return handleError(res, err); }
      if (!meeting) { return res.send(404); }
      _.merge(item, req.body);
      meeting.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(item);
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
