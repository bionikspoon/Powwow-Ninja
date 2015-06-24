'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meeting = require('./meeting.model');

var clean = function (done) {
  Meeting.find({}).remove().exec().then(function () {
    done();
  });
};

var MockMeeting = {
  items: [
    {
      title: 'save the world',
      section: 'New Items',
      notes: 'create ai'
    }
  ],
  members: []
};

describe('Meeting API', function (done) {

  beforeEach(clean.bind(done));
  afterEach(clean.bind(done));

  it('should respond with JSON array', function (done) {
    request(app)//
      .get('/api/meetings')//
      .expect(200)//
      .expect('Content-Type', /json/)//
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.empty();
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should create a new empty meeting', function (done) {
    request(app)//
      .post('/api/meetings')//
      .expect(201)//
      .expect('Content-Type', /json/)//
      .end(function (error, res) {
        if (error) { done(error); }

        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('members').with.length(0);
        res.body.should.have.property('items').with.length(0);

        done();
      });
  });

  it('should create a populated meeting', function (done) {

    request(app)//
      .post('/api/meetings')//
      .expect(201)//
      .expect('Content-Type', /json/)//
      .send(MockMeeting)//
      .end(function (error, res) {
        if (error) { done(error); }

        res.body.should.be.an.Object();
        res.body.should.have.property('members').with.length(0);
        res.body.should.have.property('items').with.length(1);

        done();
      });
  });
  
  describe('Working with a meeting', function () {
    var meeting;
    beforeEach(function (done) {
      Meeting.create(MockMeeting, function (error, meetingResponse) {
        if (error) { done(error); }
        meeting = meetingResponse;
        done();
      });
    });

    it('should return a single meeting', function (done) {

      request(app)//
        .get('/api/meetings/' + meeting._id)//
        .expect(200)//
        .expect('Content-Type', /json/)//
        .end(function (error, res) {
          if (error) { done(error); }

          res.body.should.be.an.Object();
          var item = res.body.items[0];
          var mockItem = MockMeeting.items[0];
          item.title.should.equal(mockItem.title);
          item.section.should.equal(mockItem.section);
          item.notes.should.equal(mockItem.notes);


          done();

        })
    });

    it('should update a single meeting', function (done) {
      var update = {items: [{title: 'Go to seaworld'}]};
      request(app)//
        .patch('/api/meetings/' + meeting._id)//
        .expect(200)//
        .expect('Content-Type', /json/)//
        .send(update)//
        .end(function (error, res) {
          if (error) { done(error); }
          res.body.items[0].title.should.be.equal(update.items[0].title);
          done();
        })
    });
  });


});


