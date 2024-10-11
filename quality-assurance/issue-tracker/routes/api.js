'use strict';
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true, ignoreUndefined: true });

const issueSchema = new mongoose.Schema({
  project_name: String,
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_on: {type: Date, required: true},
  updated_on: {type: Date, required: true},
  created_by: {type: String, required: true},
  assigned_to: {type: String, default: ''},
  open: {type: Boolean, required: true},
  status_text: {type: String, default: ''}
})

const Issue = mongoose.model('Issues', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const id = req.query._id
      const searchFilter = {
        _id: id,
        project_name: req.params.project,
        issue_title: req.query.issue_title,
        issue_text: req.query.issue_text, 
        created_on: req.query.created_on,
        updated_on: req.query.updated_on,
        created_by: req.query.created_by, 
        assigned_to: req.query.assigned_to,
        open: req.query.open,
        status_text: req.query.status_text
       }
      Issue.find(searchFilter).select('-__v').exec((err, data) => {
        return res.json(data)})

      
    })
    
    .post(function (req, res){
      const project = req.params.project;
      
      const { 
        issue_title: issueTitle,
        issue_text: issueText, 
        created_by: createdBy, 
        assigned_to: assignedTo,
        status_text: statusText  
      } = req.body;

      if(!issueTitle || !createdBy || !project || !issueText) return res.json({ error: 'required field(s) missing' })

      const newIssue = new Issue({
        project_name: project,
        issue_title: issueTitle,
        issue_text: issueText,
        created_on: new Date(Date.now()),
        updated_on: new Date(Date.now()),
        created_by: createdBy,
        assigned_to: assignedTo,
        open: true,
        status_text: statusText
      })
      
      newIssue.save( (err, data) => {
        if (err) return console.error(err);
        const returnData = data;
        delete returnData.__v;
        res.json(returnData)
      })
    })
    
    .put(function (req, res){
      let project = req.params.project;
      const {_id: id, } = req.body
      const { 
        issue_title: issueTitle,
        issue_text: issueText, 
        created_by: createdBy, 
        assigned_to: assignedTo,
        status_text: statusText,
        open
      } = req.body;
      const checkForValidParam = (!issueTitle && !createdBy && !issueText && open != 'false' && !assignedTo && !statusText)

      if(!id) return res.json({error: 'missing _id'})
      if (checkForValidParam) return res.json({ error: 'no update field(s) sent', '_id': id })
      
      const bonk = {updated_on: new Date(Date.now()), ...req.body}

      Issue.findByIdAndUpdate(id, {$set: {updated_on: new Date(Date.now()),...req.body}}, {new: true}, 
        (err, data) => {
          if(!data) return res.json( { error: 'could not update', '_id': id } )
          res.json({result: 'successfully updated', '_id': data._id})
        } )
      
    })
    
    .delete(function (req, res){
      const project = req.params.project;
      const id = req.body._id;
      if (!id) return res.json({ error: 'missing _id' })
      Issue.deleteOne({_id: id}, (err, data) => {
        return (data.deletedCount == 0 
        ? res.json({ error: 'could not delete', '_id': id }) 
        : res.json({ result: 'successfully deleted', '_id': id })
        )
      })
      
    });
    
};
