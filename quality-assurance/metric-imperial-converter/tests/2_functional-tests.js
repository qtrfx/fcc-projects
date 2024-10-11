const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Test GET with only a unit', (done) => {
        chai
        .request(server)
        .get('/api/convert/?input=gal')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":1,"initUnit":"gal","returnNum":3.78541,"returnUnit":"L","string":"1 liters converts to 3.78541 gallons"}')
            done();

        })
    })
    test('Test GET with an integer number and unit', (done) => {
        chai
        .request(server)
        .get('/api/convert/?input=32l')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":32,"initUnit":"L","returnNum":8.45351,"returnUnit":"gal","string":"32 gallons converts to 8.45351 liters"}')
            done();
        });
    });
    test('Test GET with a decimal', (done) => {
        chai
        .request(server)
        .get('/api/convert/?input=38.5mi')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":38.5,"initUnit":"mi","returnNum":61.95959,"returnUnit":"km","string":"38.5 miles converts to 61.95959 kilometers"}')
            done();
        });
    });
    test('Test GET with a fraction', (done) => {
        chai
        .request(server)
        .get('/api/convert/?input=234/2km')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":117,"initUnit":"km","returnNum":72.70061,"returnUnit":"mi","string":"117 kilometers converts to 72.70061 miles"}')
            done();
        });
    });
    test('Test GET with a fraction and decimal', (done) => {
        chai
        .request(server)
        .get('/api/convert/?input=23.4/2.25km')
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":10.399999999999999,"initUnit":"km","returnNum":6.46228,"returnUnit":"mi","string":"10.399999999999999 kilometers converts to 6.46228 miles"}')
            done();
        })
    })
});
