'use strict';

var express = require('express');
var controller = require('./meeting.controller');
var member = require('./members/member.controller');
var topic = require('./topics/topic.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

/**
 * Members
 **/
router.get('/:id/members', member.index);
//router.get('/:id/members/:member', member.show);
router.post('/:id/members', member.create);
router.put('/:id/members/:member', member.update);
router.patch('/:id/members/:member', member.update);
//router.delete('/:id/members/:member', member.destroy);

/**
 * Topics
 **/
router.get('/:id/topics', topic.index);
//router.get('/:id/topics/:topic', topic.show);
//router.post('/:id/topics', topic.create);
//router.put('/:id/topics/:topic', topic.update);
//router.patch('/:id/topics/:topic', topic.update);
//router.delete('/:id/topics/:topic', topic.destroy);
module.exports = router;
