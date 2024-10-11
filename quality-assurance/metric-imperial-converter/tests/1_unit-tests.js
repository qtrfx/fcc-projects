const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
    const {getNum, getUnit, getReturnUnit, spellOutUnit, convert, getString  } = convertHandler;

suite('Unit Tests', function(){
    
    test('Return a Valid integer number', () => {
        assert.equal(getNum('2131344gal'), 2131344)
    })
    test('Return a valid decimal number', () => {
        assert.equal(getNum('2313213.5345l'), 2313213.5345)
    })

    test('Return a valid fractional number', () => {
        assert.equal(getNum('234/23mi'), 10.173913043478262)
    })
    test('Return a valid fractional decimal number', () => {
        assert.equal(getNum('543.7/234kg'), 2.3235042735042737)
    })
    test('Return a valid fractional number with two decimals ', () => {
        assert.equal(getNum('534.5/23.45l'), 22.79317697228145)
    })
    test('Return a valid unit', () => {
        assert.equal(getUnit('1231321233gal'), 'gal')
        assert.notEqual(getUnit('123123145blob'), 'gal')
        assert.equal(getUnit('1.25/333333.4L'), 'L')
        assert.equal(getUnit('1.25/333333.4l'), 'L')
        assert.equal(getUnit('23124234mi'), 'mi')
        assert.equal(getUnit('1.255555/31313133333.4kg'), 'kg')

    })
    test('Return a valid liter/gallons conversion', () => {
        assert.equal(getReturnUnit('l'), 'gal')
        assert.equal(getReturnUnit('gal'), 'L')
        
    })

    test('Return a valid kilometers/miles conversion', () => {
        assert.equal(getReturnUnit('mi'), 'km')
        assert.equal(getReturnUnit('km'), 'mi')
        
    })
    test('Return a valid kilograms/pounds conversion', () => {
        assert.equal(getReturnUnit('kg'), 'lbs')
        assert.equal(getReturnUnit('lbs'), 'kg')
        
    })

    test('Return a valid gallons => liter conversion', () => {
        assert.equal(convert(1, 'gal'), 3.78541)
    })

    test('Return a valid liter => gallons conversion', () => {
        assert.equal(convert(3.78541, 'l'), 1)
    })

    test('Return a valid miles => kilometers conversion', () => {
        assert.equal(convert(1, 'mi'), 1.60934)
    })

    test('Return a valid kilometers => miles conversion', () => {
        assert.equal(convert(1.60934, 'km'), 1)
    })

    test('Return a valid pounds => kilograms conversion', () => {
        assert.equal(convert(1, 'lbs'), 0.45359)
    })

    test('Return a valid kilograms => pounds conversion', () => {
        assert.equal(convert(0.453592, 'kg'), 1)
    })
   
    test('Return a valid gallons => liters string', () => {
        assert.equal(getString(2.35, 'gallons', convert(2.35, 'gal'), 'liters'),  '2.35 gallons converts to 8.89571 liters')
    })


});