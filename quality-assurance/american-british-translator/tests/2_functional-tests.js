const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Validate POST request with valid fields', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'american-to-british'
            })
            .end((err, data) => {
                assert.equal(data.body.text, "Mangoes are my favorite fruit.")
                assert.equal(data.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
                done();
            });
    });
    test('Validate POST request with invalid fields', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'greek-to-english'
            })
            .end((err, data) => {
                assert.equal(data.body.error, 'Invalid value for locale field')
                done();
            });
    });
    test('Validate POST request with missing text field', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                notText: 'thisisnottext',
                locale: 'british-to-american'
            })
            .end((err, data) => {
                assert.equal(data.body.error, 'Required field(s) missing')
                done();
            });
    });
    test('Validate POST request with missing locale field', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                text: 'This is text',
                definitelyNotLocale: 'this isnt a locale'
            })
            .end((err, data) => {
                assert.equal(data.body.error, 'Required field(s) missing')
                done();
            });
    });
    test('Validate POST request with empty text field', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                text: '',
                locale: 'american-to-british'
            })
            .end((err, data) => {
                assert.equal(data.body.error, 'No text to translate')
                done();
            });
    });
    test('Validate POST request with valid fields', (done) => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .type('form')
            .send({
                text: 'Text that needs no translation! Yay!',
                locale: 'american-to-british'
            })
            .end((err, data) => {
                assert.equal(data.body.text, "Text that needs no translation! Yay!")
                assert.equal(data.body.translation, "Everything looks good to me!")
                done();
            });
    });

});
