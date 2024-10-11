const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const expect = chai.expect;
let mappedArr;
let threadId;
let threadDeletePassword;
let testTextString = btoa((Math.random() * 10000).toString())

let replyString = btoa((Math.random() * 10000).toString())
let replyId;

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Create a Thread', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .post("/api/threads/testing")
      .type('form')
      .send({text: testTextString, delete_password: 'test'})
      .end((err, res) => {
        assert.equal(res.status, '200')
        expect(res).to.redirectTo(`http://localhost:3001/b/testing/`)
        done();
      
      })

      })
      test('View the 10 most recent threads', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .get("/api/threads/testing")
      .end((err, res) => {
        assert.equal(res.status, '200')
        assert.isAtMost(res.body.length, 10)
        assert.isAtLeast(res.body.length, 1)
        res.body.forEach(e => {
          if(e.text == testTextString) {
            threadId = e._id
          }
          assert.isAtMost(e.replies.length, 3)})
        done();
      
      })


      })
      
      test('Report a thread', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .put("/api/threads/testing")
      .type('form')
      .send({threadId: threadId })
      .end((err, res) => {
        assert.equal(res.status, '200')
        assert.equal(res.text, 'reported')
        done();
      
      })


      })
      test('Create a reply', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .post(`/api/replies/testing`)
      .type('form')
      .send({delete_password: 'lol', thread_id: threadId, text: replyString })
      .end((err, res) => {
        const url = 'http://localhost:3001/b/testing/' + threadId
        assert.equal(res.status, '200')
        expect(res).to.redirectTo(url)
        done();
      
      })


      })
      test('Viewing all replies of a thread', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .get(`/api/replies/testing?thread_id=${threadId}`)
      .end((err, res) => {
        res.body.replies.forEach(reply => {
          if(reply.text == replyString) {
            replyId = reply._id
          }
        })
        assert.isObject(res.body)
        assert.property(res.body, '_id')
        assert.property(res.body, 'board')
        assert.property(res.body,'text')
        assert.equal(res.body.board, 'testing')
        assert.equal(res.body.text, testTextString)
        assert.property(res.body, 'created_on')
        assert.property(res.body, 'bumped_on')
        assert.property(res.body,'replycount')
        assert.property(res.body, 'replies')
        res.body.replies.forEach(reply => {
          assert.property(reply, '_id')
          assert.property(reply, 'text')
          assert.property(reply, 'created_on')

          if(reply._id == replyId) {
            assert.equal(reply.text, replyString)
          }
        })
        done();
      
      })


      })
      test('Report a reply', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .put(`/api/replies/testing`)
      .type('form')
      .send({thread_id: threadId, reply_id: replyId})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'reported')
       
        done();
      
      })


      })
      test('Delete a reply with incorrect password', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .delete(`/api/replies/testing`)
      .type('form')
      .send({thread_id: threadId, reply_id: replyId, delete_password: 'incorrect'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'incorrect password')
       
        done();
      
      })


      })
      test('Delete a reply with correct password', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .delete(`/api/replies/testing`)
      .type('form')
      .send({thread_id: threadId, reply_id: replyId, delete_password: 'lol'})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'success')
       
        done();
      
      })


      })
      test('Delete Thread with incorrect Password', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .delete("/api/threads/testing")
      .type('form')
      .send({delete_password: 'dgshfjgfjhk', threadId: threadId })
      .end((err, res) => {
        assert.equal(res.status, '200')
        assert.equal(res.text, 'incorrect password')
        done();
      
      })


      })
      test('Delete Thread with correct Password', function(done) {
        chai
      .request('http://localhost:3001')
      .keepOpen()
      .delete("/api/threads/testing")
      .type('form')
      .send({delete_password: 'test', threadId: threadId })
      .end((err, res) => {
        assert.equal(res.status, '200')
        assert.equal(res.text, 'success')
        done();
      
      })


      })
  

});
