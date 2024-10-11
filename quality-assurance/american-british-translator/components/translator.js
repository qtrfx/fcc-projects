const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const flipObject = (objectToFlip) => Object.fromEntries(Object.entries(objectToFlip).map(e => [e[1], e[0]]));
const checkPunctuation = (inputToCheck) => /[\.\?\!\,\:\;]$/.test(inputToCheck);

function checkTitle(inputToCheck, locale) {

    return (locale == 'american-to-british'
    ? /^mr\.$|^mrs\.$|^ms\.$|^mx\.$|^dr\.$|^prof\.$/i.test(inputToCheck)
    : /^mr$|^mrs$|^ms$|^mx$|^dr$|^prof$/i.test(inputToCheck)
    )
}

function pickDict(locale) {
    if(locale == 'american-to-british') return [americanToBritDict, americanToBritishTitles];
    return [britishToAmericantDict, flippedTitles];
}

function convertTime(timeToConvert, locale) {
    let punctuation;
    let amPm;
    let convertedTime;

    const punctFound = checkPunctuation(timeToConvert);
    const amPmFound = /(am|pm)\.?/i.test(timeToConvert)

    if(punctFound) {
        punctuation = timeToConvert.slice(-1);
        timeToConvert = timeToConvert.slice(0, timeToConvert.length - 1);
    }
    if(amPmFound) {
        amPm = timeToConvert.slice(-2);
        timeToConvert = timeToConvert.slice(0, timeToConvert.length - 2);
    }
    locale == 'american-to-british' 
        ? convertedTime = timeToConvert.split(':').join('.') 
        : convertedTime = timeToConvert.split('.').join(':');
    
    if(amPmFound) convertedTime += amPm;
    if(punctFound) convertedTime += punctuation;

    return convertedTime;
}



function findMatch(wordArray, index, dict, amountofMerges) {
    if(amountofMerges < 1) return false

    let punctuation;
    let phrase = wordArray.slice(index, index + amountofMerges).join(' ');
    const punctFound = checkPunctuation(phrase);
    
    if(punctFound) {
        punctuation = phrase.slice(-1); 
        phrase = phrase.slice(0, phrase.length - 1);
    }

    if(phrase in dict) return (
        punctuation 
            ? {index: phrase.split(' ').length, phrase: dict[phrase] + punctuation} 
            : {index: phrase.split(' ').length, phrase: dict[phrase]});

    return findMatch(wordArray, index, dict, amountofMerges - 1);


}


function checkTime(inputToCheck, locale) {
    return (locale == 'american-to-british' 
        ? /^\d{1,2}\:\d\d(AM|PM)?(\.|\?|\:|\,|\!|\;)?/i.test(inputToCheck) 
        : /^\d{1,2}\.\d\d(AM|PM)?(\.|\?|\:|\,|\!|\;)?/i.test(inputToCheck));
}

function convertTitle(inputToCheck, dict) {
    return dict[inputToCheck].slice(0, 1).toUpperCase() + dict[inputToCheck].slice(1)
    
}



const flippedAmerican = flipObject(americanOnly), 
      flippedBritish = flipObject(britishOnly),
      flippedSpelling = flipObject(americanToBritishSpelling),
      flippedTitles = flipObject(americanToBritishTitles),
      britishToAmericantDict = {...flippedAmerican, ... flippedSpelling, ...britishOnly},
      americanToBritDict = {...flippedBritish, ... americanToBritishSpelling, ... americanOnly};


class Translator {

     translate(text, locale) {

        let i = 0;
        const highlight = [],
              immutableText = text.replace(/\n/, "").split(' '),
              splitText = text.replace(/\n/, "").toLowerCase().split(" "),
              dict = pickDict(locale)[0],
              titles = pickDict(locale)[1],
              translatedText = [];

        while(i < splitText.length) {

            const oneWord = splitText[i],
                  time = checkTime(oneWord, locale),
                  title = checkTitle(oneWord, locale),
                  foundMatch = findMatch(splitText, i, dict, 3);
            
            let foundTime,
                foundTitle;
    
            
            if(time) {
                foundTime = convertTime(oneWord, locale);
                translatedText.push(foundTime);
                highlight.push(foundTime.split(/AM|PM/i).join(''))
                i++;
            
            }

            else if(foundMatch){
                translatedText.push(foundMatch.phrase);
                highlight.push(foundMatch.phrase.split(/[\.\?\!\,\:\;]$/).join(''))
                i += foundMatch.index;
            }
            else if(title) {
                foundTitle = convertTitle(oneWord, titles);
                translatedText.push(foundTitle);
                highlight.push(foundTitle);
                i++
            }
            
            else {
                translatedText.push(immutableText[i]);
                i++;
            }
    }
        return {translatedText: translatedText.join(' '), highlight: highlight}



    }

    highlightTranslation(highlightInfo, translatedText) {
        let mutableText = translatedText.slice()

        highlightInfo.forEach(e => mutableText = mutableText.replace(e, '<span class="highlight">' + e + '</span>') )
        return mutableText;

    }
}

module.exports = Translator;