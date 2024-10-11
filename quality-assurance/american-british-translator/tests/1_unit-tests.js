const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translater = new Translator();
const {translate, highlightTranslation} = translater;


suite('Unit Tests', () => {

    suite('Translate Strings', () => {

        suite('Translate to British English', () => {
            test('Translate "Mangoes are my favorite Food"', () => {
                assert.equal(translate("Mangoes are my favorite Food", "american-to-british").translatedText, 'Mangoes are my favourite Food')
            })
            test('Translate "I ate yogurt for breakfast."', () => {
                assert.equal(translate("I ate yogurt for breakfast.", "american-to-british").translatedText, 'I ate yoghurt for brekky.')
            })
            test('Translate "We had a party at my friend\'s condo."', () => {
                assert.equal(translate("We had a party at my friend's condo.", "american-to-british").translatedText, 'We had a party at my friend\'s flat.')
            })
            test('Translate "Can you toss this in the trashcan for me?"', () => {
                assert.equal(translate("Can you toss this in the trashcan for me?", "american-to-british").translatedText, 'Can you toss this in the bin for me?')
            })
            test('Translate "The parking lot was full."', () => {
                assert.equal(translate("The parking lot was full.", "american-to-british").translatedText, 'The car park was full.')
            })
            test('Translate "Like a high tech Rube Goldberg machine."', () => {
                assert.equal(translate("Like a high tech Rube Goldberg machine.", "american-to-british").translatedText, 'Like a high tech Heath Robinson device.')
            })
            test('Translate "To play hooky means to skip class or work."', () => {
                assert.equal(translate("To play hooky means to skip class or work.", "american-to-british").translatedText, 'To bunk off means to skip class or work.')
            })
            test('Translate "No Mr. Bond, I expect you to die."', () => {
                assert.equal(translate("No Mr. Bond, I expect you to die.", "american-to-british").translatedText, 'No Mr Bond, I expect you to die.')
            })
            test('Translate "Dr. Grosh will see you now."', () => {
                assert.equal(translate("Dr. Grosh will see you now.", "american-to-british").translatedText, 'Dr Grosh will see you now.')
            })
            test('Translate "Lunch is at 12:15 today."', () => {
                assert.equal(translate("Lunch is at 12:15 today.", "american-to-british").translatedText, 'Lunch is at 12.15 today.')
            })
        })

        suite("Translate to American English", () => {
            test('Translate "We watched the footie match for a while."', () => {
                assert.equal(translate("We watched the footie match for a while.", "british-to-american").translatedText, 'We watched the soccer match for a while.')
            })
            test('Translate "Paracetamol takes up to an hour to work."', () => {
                assert.equal(translate("Paracetamol takes up to an hour to work.", "british-to-american").translatedText, 'Tylenol takes up to an hour to work.')
            })
            test('Translate "First, caramelise the onions."', () => {
                assert.equal(translate("First, caramelise the onions.", "british-to-american").translatedText, 'First, caramelize the onions.')
            })
            test('Translate "I spent the bank holiday at the funfair."', () => {
                assert.equal(translate("I spent the bank holiday at the funfair.", "british-to-american").translatedText, 'I spent the public holiday at the carnival.')
            })
            test('Translate "I had a bicky then went to the chippy."', () => {
                assert.equal(translate("I had a bicky then went to the chippy.", "british-to-american").translatedText, 'I had a cookie then went to the fish-and-chip shop.')
            })
            test('Translate "I\'ve just got bits and bobs in my bum bag."', () => {
                assert.equal(translate("I've just got bits and bobs in my bum bag.", "british-to-american").translatedText, 'I\'ve just got odds and ends in my fanny pack.')
            })
            test('Translate "The car boot sale at Boxted Airfield was called off."', () => {
                assert.equal(translate("The car boot sale at Boxted Airfield was called off.", "british-to-american").translatedText, 'The swap meet at Boxted Airfield was called off.')
            })
            test('Translate "Have you met Mrs Kalyani?"', () => {
                assert.equal(translate("Have you met Mrs Kalyani?", "british-to-american").translatedText, 'Have you met Mrs. Kalyani?')
            })
            test('Translate "Prof Joyner of King\'s College, London."', () => {
                assert.equal(translate("Prof Joyner of King's College, London.", "british-to-american").translatedText, 'Prof. Joyner of King\'s College, London.')
            })
            test('Translate "Tea time is usually around 4 or 4.30."', () => {
                assert.equal(translate("Tea time is usually around 4 or 4.30.", "british-to-american").translatedText, 'Tea time is usually around 4 or 4:30.')
            })
        })
        suite('Test Highlighting', () => {
            test('Highlight "Mangoes are my favorite Food"', () => {
                assert.equal(highlightTranslation(["favourite"],"Mangoes are my favourite Food"), 'Mangoes are my <span class="highlight">favourite</span> Food')
            })
            test('Highlight "I ate yogurt for breakfast."', () => {
                assert.equal(highlightTranslation(["yoghurt", "brekky"], "I ate yoghurt for brekky."), 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekky</span>.')
            })
            test('Highlight "We watched the footie match for a while."', () => {
                assert.equal(highlightTranslation(["soccer"], "We watched the soccer match for a while."), 'We watched the <span class="highlight">soccer</span> match for a while.')
            })
            test('Highlight "Paracetamol takes up to an hour to work."', () => {
                assert.equal(highlightTranslation(["Tylenol"], "Tylenol takes up to an hour to work."), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
            })
        })
    })

});
