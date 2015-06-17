/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Meeting = require('../api/meeting/meeting.model');

var faker = require('faker');
var _ = require('lodash');

//noinspection JSUnresolvedFunction
User.find({}).remove(function () {
  var users = [
    {
      provider: 'local',
      name: 'Test User',
      email: 'test@app.com',
      password: 'secret'
    },
    {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@app.com',
      password: 'secret'
    }
  ];

  _.times(40, function () {
    users.push({
      provider: 'local',
      role: _.sample([
        'admin',
        'user'
      ]),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'secret'

    })
  });

  User.create(users, function (error) {
    if (error) { console.error(error); }
    var users = _.drop(arguments);
    console.log('finished populating users');

  });
});

Meeting.find({}).remove(function (error) {
  if (error) { console.error(error); }

  var meeting = new Meeting({_id: '5580e935cc779b683340e6bd'});
  var members = [];
  _.times(10, function () {
    members.push({name: faker.name.findName()});
  });

  meeting.members = _.uniq(members);
  meeting.topics = [
    {
      title: 'Follow-ups',
      items: [{title: 'Setup meetings'}]
    },
    {
      title: 'New Items',
      items: [
        {title: 'Save the world'},
        {title: 'Work on project'},
        {title: 'Solve the problem'}
      ]
    }
  ];

  meeting.save(function (error) {
    if (error) { console.error(error); }
    console.log('finished creating a Meeting');
  });

});
