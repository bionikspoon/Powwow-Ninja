var faker = require('faker');
var _ = require('lodash');


var MockMeeting = {};
MockMeeting.members = _.uniq(_.times(10, function () {
  return {name: faker.name.findName()};
}));
MockMeeting.items = [
  {
    title: 'Setup Meetings',
    section: 'Follow-ups',
    notes: 'Dr Evil can\'t build that "peace" machine.'
  },
  {
    title: 'Save the world',
    section: 'New Items',
    assignments: [
      {
        owner: {name: _.sample(MockMeeting.members).name},
        description: 'Build doomsday device!'
      }
    ]
  },
  {
    title: 'Work on project',
    section: 'New Items'
  },
  {
    title: 'Solve the problem',
    section: 'New Items'
  }

];

module.exports = MockMeeting;
