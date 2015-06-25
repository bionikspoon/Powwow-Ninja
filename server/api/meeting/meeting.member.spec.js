'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meeting = require('./meeting.model');
var _ = require('lodash');
var agent = request.agent(app);
var MockMeeting = require('./meeting.mock');

var clean = function (done) {
    Meeting.find({}).remove().exec().then(function () {done();});
};



describe('Meeting Members API', function () {
    var meeting;
    var api;
    var member;

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

                member = _.first(meeting.members);

                done();
            });
        });

    });

    afterEach(function (done) {
        Meeting.find({}).remove().exec().then(function () {

            done();
        });
    });

    describe('GET Meeting members', function () {
        beforeEach(function () {
            api = agent//
                .get('/api/meetings/' + meeting._id + '/members')//
                .expect('Content-Type', /json/)//
                .expect(200);

        });

        afterEach(finish);

        it('should return an array of members', function () {
            api.expect(function (res) {
                res.body.should.be.length(10);
                res.body.should.be.an.Array();
            });
        });

    });

    describe('GET A single meeting member', function () {
        beforeEach(function () {
            api = agent//
                .get('/api/meetings/' + meeting._id + '/members/' + member._id)//
                .expect('Content-Type', /json/)//
                .expect(200);

        });

        afterEach(finish);

        it('should have correct info', function () {
            api.expect(function (res) {
                res.body.should.be.an.Object();
                res.body.name.should.equal(member.name);
            });
        });
        it('should include document id', function () {
            api.expect(function (res) {
                res.body._id.should.match(/[a-f0-9]{24}/i)//
                    .and.equal(member.id);

            });
        });

    });

    describe('POST to create new meeting member', function () {
        var newMember;
        beforeEach(function () {
            newMember = {name: 'Dwayne Johnson'};
            api = agent//
                .post('/api/meetings/' + meeting._id + '/members')//
                .expect(201)//
                .expect('Content-Type', /json/)//
                .send(newMember);
        });

        afterEach(finish);

        it('should return the new member', function () {
            api.expect(function (res) {
                res.body.name.should.be.equal(newMember.name);
            });
        });
        it('should create an id for the new member', function () {
            api.expect(function (res) {
                res.body.should.have.property('_id')//
                    .and.match(/[a-fA-F0-9]{24}/);
            });
        });

    });

    describe('PATCH Upate a single meeting member', function () {
        var memberUpdate = {name: 'Dwayne Johnson'};
        beforeEach(function () {
            api = agent//
                .patch('/api/meetings/' + meeting._id + '/members/' +
                       member._id)//
                .expect(200)//
                .expect('Content-Type', /json/);
        });


        afterEach(finish);


        it('should checkin a single member', function () {
            var now = Date.now();
            api//
                .send(memberUpdate)//
                .expect(function (res) {
                    res.body.should.be.an.Object();
                    Date(res.body.checkin).should.equal(Date(now));
                });
        });

        it('should checkout a single member', function () {
            var now = Date.now();
            api//
                .send({
                    checkin: now,
                    checkout: now
                })//
                .expect(function (res) {
                    res.body.should.be.an.Object();
                    Date(res.body.checkout).should.equal(Date(now));
                });
        });

        it('should update a single member', function () {
            api//
                .send(memberUpdate)//
                .expect(function (res) {
                    res.body.should.be.an.Object();
                    res.body.name.should.equal(memberUpdate.name);
                });
        });

    });

});
