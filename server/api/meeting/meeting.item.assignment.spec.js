'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meeting = require('./meeting.model');
var _ = require('lodash');
var agent = request.agent(app);
var MockMeeting = require('./meeting.mock');

xdescribe('Meeting Items Api', function () {
   var meeting;
   var api;
   var item;

   var finish = function (done) {
      api.end(function (error) {
         if (error) { return done(error); }
         done();
      });
   }.bind(api);

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

   afterEach(finish);
   afterEach(function () {
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
   });

   describe('GET A single meeting item', function () {
      beforeEach(function () {
         api = agent//
            .get('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect('Content-Type', /json/)//
            .expect(200);

      });

   });

   describe('POST A new meeting item', function () {
      beforeEach(function () {
         api = agent//
            .post('/api/meetings/' + meeting._id + '/items')//
            .expect(201)//
            .expect('Content-Type', /json/)//

      });

   });

   describe('PATCH A meeting item', function () {
      beforeEach(function () {
         api = agent//
            .patch('/api/meetings/' + meeting._id + '/items/' + item._id)//
            .expect(200)//
            .expect('Content-Type', /json/);

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


//describe('Meeting API', function () {
//    var meeting;
//    var api;
//
//    var finish = function (done) {
//        api.end(function (error) {
//            if (error) { done(error); }
//            done();
//        });
//    }.bind(api);
//
//    beforeEach(function (done) {
//        Meeting.find({}).remove().exec().then(function () {
//            done();
//        });
//    });
//
//    describe('GET All meetings', function () {
//        beforeEach(function () {
//            api = agent//
//                .get('/api/meetings')//
//                .expect(200)//
//                .expect('Content-Type', /json/);
//        });
//
//        afterEach(finish);
//
//        it('should be an empty array', function () {
//            api//
//                .expect(function (res) {
//                    res.body.should.be.empty();
//                    res.body.should.be.Array();
//                })
//        });
//
//        it('should be a populated array', function (done) {
//            Meeting.create(MockMeeting).then(function () {
//                api//
//                    .expect(function (res) {
//                        res.body.should.be.length(1);
//                        res.body.should.be.Array();
//                    });
//                done();
//            });
//        });
//
//    });
//
//    describe('GET A single meeting', function () {
//
//        beforeEach(function (done) {
//            Meeting.create(MockMeeting, function (error, meetingResponse) {
//                if (error) { done(error); }
//                meeting = meetingResponse;
//                api = agent//
//                    .get('/api/meetings/' + meeting._id)//
//                    .expect(200)//
//                    .expect('Content-Type', /json/);
//                done();
//            });
//        });
//        afterEach(finish);
//
//
//        it('should be an object with meeting properties', function () {
//            api//
//                .expect(function (res) {
//
//                    res.body.should.be.an.Object();
//                    res.body.should.have.property('items');
//                    res.body.should.have.property('items');
//
//                })
//        });
//        it('should be populated with data', function () {
//            api.expect(function (res) {
//                var item = _.first(res.body.items);
//                var mockItem = _.first(MockMeeting.items);
//                item.title.should.equal(mockItem.title);
//                item.section.should.equal(mockItem.section);
//                item.notes.should.equal(mockItem.notes);
//            });
//        });
//
//    });
//
//    describe('POST A single meeting', function () {
//        beforeEach(function () {
//            api = agent//
//                .post('/api/meetings')//
//                .expect(201)//
//                .expect('Content-Type', /json/);
//        });
//        afterEach(finish);
//
//        it('should respond with created meeting', function () {
//            api//
//                .expect(function (res) {
//
//                    res.body.should.be.an.Object();
//                    res.body.should.have.property('items').with.length(0);
//                    res.body.should.have.property('items').with.length(0);
//
//                });
//        });
//
//        it('should create a populated meeting', function () {
//
//            api//
//                .send(MockMeeting)//
//                .expect(function (res) {
//
//                    res.body.should.be.an.Object();
//                    res.body.should.have.property('items').with.length(0);
//                    res.body.should.have.property('items').with.length(1);
//
//                });
//        });
//    });
//
//    describe('PATCH A single meeting', function () {
//        var update = {items: [{title: 'Go to seaworld'}]};
//        beforeEach(function (done) {
//            Meeting.create(MockMeeting, function (error, meetingResponse) {
//                if (error) { done(error); }
//                meeting = meetingResponse;
//                api = agent//
//                    .patch('/api/meetings/' + meeting._id)//
//                    .expect(200)//
//                    .expect('Content-Type', /json/)//
//                done();
//            });
//        });
//        afterEach(finish);
//
//        it('should update a single meeting', function () {
//
//            api//
//                .send(update)//
//                .expect(function (res) {
//                    var item = _.first(res.body.items);
//                    var updateItem = _.first(update.items);
//                    item.title.should.be.equal(updateItem.title);
//
//                });
//        });
//
//    });
//
//    describe('DELETE A single Meeting', function () {
//        beforeEach(function () {
//
//        });
//
//    });
//
//});
