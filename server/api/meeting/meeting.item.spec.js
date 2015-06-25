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
   var mockItem = _.first(MockMeeting.items);
   var newItem = {
      title: 'Go to Canada',
      notes: 'Must be first class tickets',
      status: 'NEW'
   };
   var updateItem = {
      title: newItem.title
   };

   beforeEach(function (done) {
      Meeting.find({}).remove().exec().then(function () {
         Meeting.create(MockMeeting, function (error, meetingResponse) {
            if (error) { return done(error); }
            meeting = meetingResponse;

            item = _.first(meeting.items);

            done();
         });
      });
   });

   //afterEach(finish);
   afterEach(function (done) {
      Meeting.find({}).remove().exec().then(function () {
         done();
      });
   });

   describe('GET All Meeting items', function () {
      beforeEach(function () {
         api = agent//
            .get('/api/meetings/' + meeting._id + '/items')//
            .expect('Content-Type', /json/)//
            .expect(200);
      });
      it('should be an array of items', function (done) {
         api.end(function (err, res) {
            if (err) {return done(err);}
            res.body.should.be.an.Array().with.length(4);
            done();
         })
      });
   });

   describe('GET A single meeting item', function () {
      beforeEach(function () {
         api = agent//
            .get('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect('Content-Type', /json/)//
            .expect(200);
      });

      it('should have item properties', function (done) {
         api.end(function (err, res) {
            if (err) {return done(err);}
            res.body.should.be.an.Object();
            res.body.should.have.property('title');
            res.body.should.have.property('section');
            res.body.should.have.property('notes');
            res.body.should.have.property('_id');

            done();
         })
      });

      it('should have the right values', function (done) {
         api.end(function (err, res) {
            if (err) {return done(err)}
            res.body.title.should.equal(mockItem.title);
            res.body.section.should.equal(mockItem.section);
            res.body.notes.should.equal(mockItem.notes);
            res.body['_id'].should.match(/[a-f0-9]{24}/i);

            done();
         })
      });
   });

   describe('POST A new meeting item', function () {
      beforeEach(function () {
         api = agent//
            .post('/api/meetings/' + meeting._id + '/items')//
            .expect(201)//
            .expect('Content-Type', /json/);
      });
      it('response with new item', function (done) {
         api.send(newItem)//
            .end(function (err, res) {
               if (err) {return done(err);}
               res.body.should.be.an.Object();
               res.body['_id'].should.match(/[a-f0-9]{24}/i);
               res.body.title.should.equal(newItem.title);
               res.body.status.should.equal(newItem.status);
               res.body.section.should.equal('New Items');
               res.body.notes.should.equal(newItem.notes);
               done();
            });
      });
   });

   describe('PATCH A meeting item', function () {
      beforeEach(function () {
         api = agent//
            .patch('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect(200)//
            .expect('Content-Type', /json/);

      });
      it('should return the updated item', function (done) {
         api.send(updateItem)//
            .end(function (err, res) {
               if (err) {return done(err);}
               res.body.should.be.an.Object();
               //res.body.id.should.equal(item.id);
               res.body.title.should.equal(updateItem.title);


               done();
            });
      });

   });

   describe('DELETE A meeting item', function () {
      beforeEach(function () {
         api = agent//
            .delete('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect(200)//
            .expect('Content-Type', /json/);
      });
   });
});
