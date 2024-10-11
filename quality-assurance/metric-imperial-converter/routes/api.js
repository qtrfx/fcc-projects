'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  app.get('/api/convert', (req, res) => {
    const  { input }  = req.query;
    const matchNumber = input.match(/^\d+(\.\d+)?(\/\d+)?(\.\d+)?(?=[a-z]+)/i);
    const matchUnit = input.match(/((?<![a-z])l|gal|lbs|kg|mi|km)$/i);
    const matchOnlyUnit = input.match(/^((?<!ga)l$|gal|lbs|kg|mi|km)$/i);

    switch(true) {
      case !input:
        return res.json({"error": "use ?input="});
      case (!matchNumber && !matchUnit):
        return res.type('text').send('invalid number and unit');
      case (!matchUnit):
        return res.type('text').send('invalid unit');
      case (!matchNumber && !matchOnlyUnit):
        return res.type('text').send('invalid number');
    }
  
    const convertHandler = new ConvertHandler();

    const {getNum, getUnit, getReturnUnit, spellOutUnit, convert, getString  } = convertHandler;
    const initNum = getNum(input);
    const initUnit = getUnit(input);
    const returnUnit = getReturnUnit(initUnit);
    const spelledOld = spellOutUnit(initUnit);
    const spelledUnit = spellOutUnit(returnUnit);
    const converted = convert(initNum, initUnit);
    const string = getString(initNum, spelledUnit, converted, spelledOld);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: converted,
      returnUnit: returnUnit,
      string: string
    })
  })
  

};
