'use strict';

var express = require('express');
var controller = require('./meeting.controller');
var member = require('./meeting.member.controller.js');

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
router.post('/:id/members', member.create);


module.exports = router;
