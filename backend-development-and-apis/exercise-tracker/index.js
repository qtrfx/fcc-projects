const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const mySecret = process.env['MONGO_URI']
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const exerciseSchema = new mongoose.Schema ({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: Date,
  user_id: String
})

const userSchema = new mongoose.Schema ({
  username: { type: String, required: true },
});



const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


app.post("/api/users", (req, res) => {
  let newUser = new User({username: req.body.username });
    newUser.save((err, data) => {
      if (err) return console.error(err);
      res.json({username: data.username, _id: data.id})
    });
})


app.get("/api/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err) return console.error(err);
    
    const cleanArray = [];
    
    data.forEach(e => cleanArray.push({"username": e.username, "_id": e.id}))
    
    res.json(cleanArray);
  })
})


app.post("/api/users/:_id/exercises", (req, res) => {
  User.findOne({_id: req.params['_id']}, (err, success) => {
    if(err) return console.error(err);
    if(!success) return res.json({"error": "user id not found"})
    
    let convDate;
    
    !req.body.date ? convDate = new Date(Date.now()) : convDate = new Date(req.body.date);
      
 
    let newExc = new Exercise(
      {"user_id": success['_id'], 
       "description": req.body.description, 
       "duration": req.body.duration, 
       "date": convDate}
    );
    
    newExc.save((err, data) => {
      if (err) return console.error(err);
      
      const returnObj = {
        username: success.username,
        description: data.description,
        duration: data.duration,
        date: data.date.toDateString(),
        _id: success['_id']
      }
      
      res.json(returnObj);
    });
  })  
})

app.get("/api/users/:id/logs", (req, res) => {

  const found = [];
  User.findOne({_id: req.params.id}, (err, usrData) => {
    if (!usrData) return res.json({"error": "user id not found"});
 
   Exercise.find({user_id: usrData["_id"]}, (err, data) => {
      let filteredData = data.slice();
     
     if (req.query.from && req.query.to) {
     filteredData = filteredData.filter(e => e.date >= new Date(req.query.from) && e.date <= new Date(req.query.to));

     }
     if (req.query.limit) {
       filteredData = filteredData.filter((e,i) => i <= req.query.limit - 1);

     }
    filteredData.forEach(e => 
      found.push(
        {"description": e.description,
         "duration": e.duration,
         "date": e.date.toDateString()}
      )
    )
     
    res.json({username: usrData.username, count: found.length, _id: usrData["_id"], log: found})
  })

    
  })
 
  
})
