/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
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
    //seedMeeting(users);
  });
});

function seedMeeting(users) {
  //noinspection JSUnresolvedFunction
  Meeting.find({}).remove(function () {
    var meetings = [];
    var meeting;

    _.times(20, function () {
      /**
       * Scaffold meeting.
       */
      meeting = {
        meetingDate: faker.date.future(1 / 12),
        members: [],
        resources: [],
        agenda: []/*,
         chat: ''*/
      };

      /**
       * Seed meeting members
       */
      _.times(_.random(5, 15), function () {
        //noinspection JSUnresolvedVariable
        meeting.members.push({
          user: _.sample(users).id,
          rsvp: faker.date.recent(), //checkin: Date,
          //checkout: Date,
          role: _.sample([
            'MEMBER',
            'MODERATOR',
            'ADMIN'
          ])
        });
      });

      /**
       * Seed meeting resources
       */
      _.times(_.random(3, 10), function () {
        meeting.resources.push({
          name: faker.company.bs(),
          url: faker.image.imageUrl()
        })
      });

      /**
       * Seed meeting agenda
       */
      _.times(_.random(5, 15), function () {
        meeting.agenda.push(populateAgenda(users))
      });

      meetings.push(meeting);
    });

    Meeting.create(meetings, function (error) {
      if (error) { console.error(error); }

      console.log('finished populating meetings');
    });
  });
}

/**
 * Create an Agenda.
 * @returns {{title: *, status: string, assignments: Array}}
 */
function populateAgenda(users) {
  var agendaItem = {
    title: faker.company.catchPhrase(),
    status: 'open',
    assignments: []
  };

  _.times(_.random(5), function () {
    //noinspection JSUnresolvedVariable
    var assignment = {
      title: faker.company.bs(),
      owner: _.sample(users).id,
      notes: [
        {
          author: _.sample(users).id,
          content: faker.lorem.sentences()
        }
      ],
      status: _.sample([
        'OPEN',
        'CLOSED'
      ])
    };
    item.assignments.push(assignment);
  });

  return item;
}
