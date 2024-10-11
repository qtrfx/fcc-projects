require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dns = require('node:dns');
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser');

const urlSchema = new mongoose.Schema ({
  original_url: { type: String, required: true, unique: true, dropDups: true },
  short_url: {type: Number, required: true},
  shortened_url: String
});

const shortenedUrl = mongoose.model('shortenedUrl', urlSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});



app.post("/api/shorturl", (req, res) => {
  let trimmedUrl = req.body.url.match(/(https?:\/\/)(w{3}.)?[^\/:w{3}\.][\w\d\/\-\?\_\.\=]*\.[\w]+/);

  
  if (!trimmedUrl) { return res.json({ "error": "invalid url" }) }
  cutUrl = (trimmedUrl[0].split(/https?:\/\//)[1]);
  
  dns.lookup(cutUrl, (err) => {
    if (err) {
      return res.json({"error": "Couldn't resolve URL."})
    }
      
    else {
      shortenedUrl.findOne({"original_url": req.body.url}, (err, success) => {

        if (!success) {
          let identifier = (parseInt(Math.random() * 100000));
          let newUrl = new shortenedUrl({"original_url": req.body.url, "short_url": identifier, "shortened_url": `/api/shorturl/${identifier}`})
          newUrl.save(function(err, data) {
            if (err) {return console.log(err);}
            res.json({"original_url": req.body.url, "short_url": identifier});
          })
        }
          
        else {
        res.json({"original_url": success['original_url'], "short_url": success['short_url']})
        }
      })
    }
  })
})

app.get("/api/shorturl/:identifier", (req, res) => {
  shortenedUrl.findOne({"short_url": req.params.identifier}, (err, success) => {
    if (!success) {
      res.json({"error":"No short URL found for the given input"});
      return;
    }
    else {
      res.redirect(success['original_url'])
    }
  })
  
})
