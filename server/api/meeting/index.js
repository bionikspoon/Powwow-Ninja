'use strict';

var express = require('express');
var controller = require('./meeting.controller');
var member = require('./member/member.controller.js');

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

module.exports = router;
