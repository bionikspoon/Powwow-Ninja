'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meeting = require('./meeting.model');
var _ = require('lodash');

var clean = function (done) {
    Meeting.find({}).remove().exec().then(function () {done();});
};

var MockMeeting = {
    items: [
        {
            title: 'save the world',
            section: 'New Items',
            notes: 'create ai'
        }
    ],
    members: [
        {name: 'Joe Sixpack'},
        {name: 'Susy The plumber'}
    ]
};

describe('Meeting Members API', function (done) {

    beforeEach(clean.bind(done));
    afterEach(clean.bind(done));

    describe('Working with members collection', function () {
        var meeting;
        beforeEach(function (done) {
            Meeting.create(MockMeeting, function (error, meetingResponse) {
                if (error) { return done(error); }
                meeting = meetingResponse;
                done();
            });
        });

        it('should return an array of members', function (done) {
            request(app)//
                .get('/api/meetings/' + meeting._id + '/members')//
                .expect(200)//
                .expect('Content-Type', /json/)//
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.length(2);
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });

        it('should create a new member', function (done) {
            var newMember = {name: 'Dwayne Johnson'};
            request(app)//
                .post('/api/meetings/' + meeting._id + '/members')//
                .expect(201)//
                .expect('Content-Type', /json/)//
                .send(newMember)//
                .end(function (error, res) {
                    if (error) { return done(error); }
                    res.body.name.should.be.equal(newMember.name);
                    res.body.should.have.property('_id')//
                        .and.match(/[a-fA-F0-9]{24}/);
                    done();
                });
        });

        describe('Working with a member', function () {
            var member;
            var MockMember = _.first(MockMeeting.members);
            beforeEach(function (done) {

                Meeting//
                    .findOne({'members.name': MockMember.name})//
                    .select('members')//
                    .exec(function (error, meeting) {
                        if (error) { return done(error); }
                        member = _.findWhere(meeting.members, MockMember);
                        done();
                    })
            });

            it('should return a single member', function (done) {
                request(app)//
                    .get('/api/meetings/' + meeting._id + '/members/' +
                         member._id)//
                    .expect(200)//
                    .expect('Content-Type', /json/)//
                    .end(function (error, res) {
                        if (error) { return done(error); }
                        res.body.should.be.an.Object();
                        res.body.name.should.equal(MockMember.name);
                        res.body._id.should.match(/[a-f0-9]{24}/i)//
                            .and.equal(member.id);
                        done();
                    });
            });

            it('should checkin a single member', function (done) {
                var now = Date.now();
                request(app)//
                    .patch('/api/meetings/' + meeting._id + '/members/' +
                           member._id)//
                    .expect(200)//
                    .expect('Content-Type', /json/)//
                    .send({checkin: now}).end(function (error, res) {
                        if (error) { return done(error); }
                        res.body.should.be.an.Object();

                        Date(res.body.checkin).should.equal(Date(now));


                        done();
                    });
            });

            it('should checkout a single member', function (done) {
                var now = Date.now();
                request(app)//
                    .patch('/api/meetings/' + meeting._id + '/members/' +
                           member._id)//
                    .expect(200)//
                    .expect('Content-Type', /json/)//
                    .send({
                        checkin: now,
                        checkout: now
                    })//
                    .end(function (error, res) {
                        if (error) { return done(error); }
                        res.body.should.be.an.Object();

                        Date(res.body.checkout).should.equal(Date(now));


                        done();
                    });
            });

            it('should update a single member', function (done) {
                var name = 'Dwayne Johnson';
                request(app)//
                    .patch('/api/meetings/' + meeting._id + '/members/' +
                           member._id)//
                    .expect(200)//
                    .expect('Content-Type', /json/)//
                    .send({name: name})//
                    .end(function (error, res) {
                        if (error) { return done(error); }
                        res.body.should.be.an.Object();

                        res.body.name.should.equal(name);


                        done();
                    });
            });


        });
    });
});


