'use strict';

describe('Filter: groupBy', function () {

   // load the filter's module
   beforeEach(module('PowwowNinjaApp'));

   // initialize a new instance of the filter before each test
   var groupBy;
   beforeEach(inject(function ($filter) {
      groupBy = $filter('groupBy');
   }));

   it('should return the input prefixed with "groupBy filter:"', function () {
      var assignments = [
         {
            title: 'Setup Meetings',
            section: 'Follow-ups'
         },
         {
            title: 'Save the world',
            section: 'New Items'
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
      var expected = {
         'Follow-ups': [
            {
               title: 'Setup Meetings',
               section: 'Follow-ups'
            }
         ],
         'New Items': [
            {
               title: 'Save the world',
               section: 'New Items'
            },
            {
               title: 'Work on project',
               section: 'New Items'
            },
            {
               title: 'Solve the problem',
               section: 'New Items'
            }
         ]
      };
      var actual = groupBy(assignments);
      expect(actual['New Items']).toContain(expected['New Items']);
   });

});
