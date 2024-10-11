function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const splitInput = input.match(/^\d+(\.\d+)?(\/\d+)?(\.\d+)?(?=[a-z]+)/i);
    const matchOnlyUnit = input.match(/^((?<!ga)l$|gal|lbs|kg|mi|km)$/i);
    
    if(matchOnlyUnit){
      return 1;
    }
    
    if (splitInput[0].includes('/')) {
      const split = input.split('/');
      return (split.length == 1 
        ? parseFloat(split[0]) 
        : parseFloat(split[0]) / parseFloat(split[1]));
    }
    
    result = input.match(/[\d]+(\.\d+)?(?=gal|L|lbs|kg|mi|km)/i);
    return parseFloat(result[0]);
  };
  
  this.getUnit = function(input) {
    if(!input.match(/(?<!ga)l$|gal|lbs|kg|mi|km/i)){
      return 'invalid unit'
    }
    const matched = input.match(/(?<!ga)l$|gal|lbs|kg|mi|km/i)[0];
    return (/(?<!ga)l$/i.test(matched)  
      ? 'L' 
      : matched.toLowerCase())
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = "km";
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    
    switch(unit.toLowerCase()) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'mi':
        return "kilometers";
      case 'km':
        return 'miles';
      case 'lbs':
        return 'kilograms';
      case 'kg':
        return 'pounds';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
    }
    
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
          
  };
  
}

module.exports = ConvertHandler;
