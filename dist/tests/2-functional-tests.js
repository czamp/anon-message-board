/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
let testId1;
let testId2;
let testId3;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {

    suite('POST', function() {
      test('create 2 new posts', function(done) {
        chai.request(server)
        .post('/api/threads/chai')
        .send({text: 'test text', delete_password: '123'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          // done()
        })
        chai.request(server)
        .post('/api/threads/chai')
        .send({text: 'more test text', delete_password: '123'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          done()
        })

      })
    });

    suite('GET', function() {
      test('get 10 most recent threads with 3 most recent replies', function(done) {
        chai.request(server)
        .get('/api/threads/chai')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isArray(res.body);
          assert.isBelow(res.body.length, 11);
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'bumped_on');
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'replies');
          assert.notProperty(res.body[0], 'reported');
          assert.notProperty(res.body[0], 'delete_password');
          assert.isArray(res.body[0].replies);
          assert.isBelow(res.body[0].replies.length, 4);
          testId1 = res.body[0]._id;
          testId2 = res.body[1]._id;
          done()
        })
      })
    });

    suite('DELETE', function() {
      test('delete thread with correct password', function(done) {
        chai.request(server)
        .delete('/api/threads/chai')
        .send({thread_id: testId1, delete_password: '123'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
      })
      test('delete thread with incorrect password', function(done) {
        chai.request(server)
        .delete('/api/threads/chai')
        .send({thread_id: testId2, delete_password: 'badpass'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'incorrect password')
          done()
        })
      })
    });

    suite('PUT', function() {
      test('report a thread', function(done) {
        chai.request(server)
        .put('/api/threads/chai')
        .send({thread_id: testId2})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
      })
    });


  });

  suite('API ROUTING FOR /api/replies/:board', function() {

    suite('POST', function() {
      test('reply to a thread', function(done) {
        chai.request(server)
        .post('/api/replies/chai')
        .send({thread_id: testId2, text: 'replying to you', delete_password: '123'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          done();
        })
      })
    });

    suite('GET', function() {
      test('get all replies for a single thread', function(done) {
        chai.request(server)
        .get('/api/replies/chai')
        .query({thread_id: testId2})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.property(res.body, '_id')
          assert.property(res.body, 'created_on')
          assert.property(res.body, 'bumped_on')
          assert.property(res.body, 'replies')
          assert.property(res.body, 'text')
          assert.notProperty(res.body, 'delete_password')
          assert.notProperty(res.body, 'reported')
          assert.isArray(res.body.replies)
          assert.property(res.body.replies[0], 'text')
          assert.property(res.body.replies[0], 'created_on')
          assert.notProperty(res.body.replies[0], 'delete_password')
          assert.notProperty(res.body.replies[0], 'reported')
          assert.equal(res.body.replies[res.body.replies.length-1].text, 'replying to you');
          testId3 = res.body.replies[res.body.replies.length-1]._id
          done()
        })
      })
    });

    suite('PUT', function() {
      test('report a reply', function(done) {
        chai.request(server)
        .put('/api/replies/chai')
        .send({thread_id: testId2, reply_id: testId2})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
      })
    });

    suite('DELETE', function() {
      test('delete a reply', function(done) {
        chai.request(server)
        .delete('/api/replies/chai')
        .send({thread_id: testId2, reply_id: testId3, delete_password: '123'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
      })
    });

  });

});
