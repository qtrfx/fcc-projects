'use strict';

const { text } = require('body-parser');
const Translator = require('../components/translator.js');
const e = require('cors');
const translater = new Translator();
const { translate, highlightTranslation } = translater;
const localeList = ["american-to-british", "british-to-american"]

const errorrs = {
  fieldMissing: 'Required field(s) missing',
  emptyText: 'No text to translate',
  invalidLocale: 'Invalid value for locale field'

}

function errorHandling(typeofError) { 
  return { error: errorrs[typeofError] } 
}


module.exports = function (app) {
  
  

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body;
      let result;

      if(text == undefined || !locale) return res.json(errorHandling('fieldMissing'));
      if(text == '') return res.json(errorHandling('emptyText'));
      if(!localeList.includes(locale)) return res.json(errorHandling('invalidLocale'))
      result = translate(req.body.text, req.body.locale);
  
      if(req.body.text == result.translatedText) result.translatedText = "Everything looks good to me!";
      
      return res.json({text: req.body.text, translation: highlightTranslation(result.highlight, result.translatedText)})
      
    });
};
