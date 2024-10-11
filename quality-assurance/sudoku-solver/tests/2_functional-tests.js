const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Validate POST Solve Requests', () => {
        
        test('Valid Puzzle String', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .type('form')
            .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'})
            .end((err, data) => {
                assert.equal(data.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
                done();
            })
        })
        test('Missing Puzzle String', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .type('form')
            .send({notpuzzle: 'not a puzzle string'})
            .end((err, data) => {
                assert.equal(data.body.error, "Required field missing");
                done();
            })
        })
        test('Invalid Characters Puzzle String', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .type('form')
            .send({puzzle: '1111111111111111111111111111111ab111111111111111cd1111111111111111111111111111111'})
            .end((err, data) => {
                assert.equal(data.body.error, "Invalid characters in puzzle");
                done();
            })
        })
        test('Incorrect Length Puzzle String', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .type('form')
            .send({puzzle: '1111111111113231242354353453453453453453453434534563456349569374657983465987263459876238749569835'})
            .end((err, data) => {
                assert.equal(data.body.error, "Expected puzzle to be 81 characters long");
                done();
            })
        })
        test('Unsolvable Puzzle String', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .type('form')
            .send({puzzle: '111111111111114564511111221471156111111111111111791111111111432151111111111111111'})
            .end((err, data) => {
                assert.equal(data.body.error, "Puzzle cannot be solved" );
                done();
            })
        })   
    })
    suite('Validate POST Check Requests', () => {
        test('Validate Check with all fields', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'B7', value: '2', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.valid, true );
                done();
            })
        })
        test('Validate Check with a single conflict', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'A4', value: '6', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.valid, false );
                assert.isAtMost(data.body.conflict.length, 1)
                done();
            })
        })
        test('Validate Check with multiple conflicts', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'H8', value: '7', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.valid, false );
                assert.equal(data.body.conflict.length, 2)
                done();
            })
        })
        test('Validate Check with all placement conflicts', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'E2', value: '2', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.valid, false );
                assert.equal(data.body.conflict.length, 3)
                done();
            })
        })
        test('Validate Check with missing required fields', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'B7', value: '2', notpuzzle: 'mewmewcats'})
            .end((err, data) => {
                assert.equal(data.body.error, "Required field(s) missing" );
                done();
            })
        })
        test('Validate Check with invalid characters', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'B7', value: '2', puzzle: '1.5..2h84.c63.12.7.d..5.....9.g1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.error, "Invalid characters in puzzle");
                done();
            })
        })
        test('Validate Check with incorrect length', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'B7', value: '2', puzzle: '1.5..2.84..63.12.7.22131445645654654..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.error, "Expected puzzle to be 81 characters long" );
                done();
            })
        })
        test('Validate Check with incorrect coordinate', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'K0', value: '2', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.error, "Invalid coordinate" );
                done();
            })
        })
        test('Validate Check with invalid placement value', (done) => {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .type('form')
            .send({coordinate: 'B7', value: '238', puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end((err, data) => {
                assert.equal(data.body.error, "Invalid value" );
                done();
            })
        })
    })

});

