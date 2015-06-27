'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meeting = require('./meeting.model');
var _ = require('lodash');
var agent = request.agent(app);
var MockMeeting = require('./meeting.mock');

describe('Meeting Items Api', function () {
   var meeting;
   var api;
   var item;
   var assignment;
   var newAssignment;
   var updateAssignment = {description: 'Rent a uhaul truck'};

   var endpoint = function (assignmentId) {
      var compiled = _.template('/api/meetings/<%= meetingId %>/items/<%= itemId %>/assignments/<%= assignmentId %>');
      return compiled({
         meetingId: meeting._id,
         itemId: item._id,
         assignmentId: assignmentId ? assignmentId : ''
      });
   };


   beforeEach(function (done) {
      Meeting.find({}).remove().exec().then(function () {
         Meeting.create(MockMeeting, function (error, meetingResponse) {
            if (error) { return done(error); }

            meeting = meetingResponse;
            item = _.first(meeting.items);
            assignment = _.first(item.assignments);

            newAssignment = {
               owner: _.sample(meeting.members),
               description: 'Prank call Home Depot'
            };

            done();
         });
      });
   });

   afterEach(function (done) {
      Meeting.find({}).remove().exec().then(function () {
         done();
      });
   });

   describe('GET all meeting item assignment assignments', function () {
      beforeEach(function () {
         api = agent//
            .get(endpoint())//
            .expect('Content-Type', /json/)//
            .expect(200);

      });
      it('should be a list of assignments', function (done) {
         api.end(function (error, res) {
            if (error) { done(error); }
            res.body.should.be.an.Array().with.length(1);
            done()
         });
      });
   });

   describe('GET A single meeting item assignment', function () {
      beforeEach(function () {
         api = agent//
            .get(endpoint(assignment._id))//
            .expect('Content-Type', /json/)//
            .expect(200);

      });
      it('should be a single item assignment', function (done) {
         api.end(function (error, res) {
            if (error) { done(error); }
            res.body.should.be.an.Object();
            done()
         });
      });

   });

   describe('POST A new meeting item assignment', function () {
      beforeEach(function () {
         api = agent//
            .post(endpoint())//
            .expect(201)//
            .expect('Content-Type', /json/)//
            .send(newAssignment);

      });
      it('should be an object with assignment properties', function (done) {
         api//
            .end(function (error, res) {
               if (error) { return done(error); }
               res.body.should.be.an.Object();
               res.body._id.should.match(/[a-f0-9]{24}/);
               res.body.owner.should.be.an.Object();
               res.body.owner.name.should.be.a.String();
               res.body.description.should.be.a.String();
               Date(res.body.opened).should.be.a.String();

               done()
            });
      });

      it('should have correct values', function (done) {
         api//
            .end(function (error, res) {
               if (error) { return done(error); }
               res.body.owner.name.should.be.equal(newAssignment.owner.name);
               res.body.description.should.be.equal(newAssignment.description);
               Date(res.body.opened).should.be.equal(Date());
               done()
            })
      });

   });

   describe('PATCH A meeting item assignment', function () {
      beforeEach(function () {
         api = agent//
            .patch(endpoint(assignment._id))//
            .expect(200)//
            .expect('Content-Type', /json/)//
            .send(updateAssignment);
      });

      it('should be the updated object', function (done) {
         api.end(function (error, res) {
            if (error) { return done(error); }

            res.body.should.be.an.Object();
            res.body.description.should.equal(updateAssignment.description);
            res.body.owner.name.should.be.equal(assignment.owner.name);

            done()
         });
      });

   });

   describe('DELETE A meeting item assignment', function () {
      beforeEach(function () {
         api = agent//
            .delete('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect(200)//
            .expect('Content-Type', /json/);

      });

   });
});
