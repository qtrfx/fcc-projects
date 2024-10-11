'use strict';
const e = require('cors');
const mongoose = require('mongoose')
mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
});



const replySchema = new mongoose.Schema(
  {
    thread_id: String,
    text: String,
    created_on: {type: Date, required: true},
    delete_password: {type: String, required: true},
    reported: {type: Boolean, required: true, default: false}
  }
)

const threadSchema = new mongoose.Schema(
  {
    board: {type: String, required: true},
    text: String,
    delete_password: String,
    created_on: {type: Date, required: true},
    bumped_on: {type: Date, required: true},
    reported: {type: Boolean, required: true, default: false},
    replies: [replySchema.pick(["text", "created_on"])],
    replycount: {type: Number, default: 0}


  }
)

const Thread = new mongoose.model('Thread', threadSchema)
mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
});
const Reply = new mongoose.model('Reply', replySchema)


module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .get(async (req, res) => {
      const { board } = req.params
      const boardData = await Thread
        .find({board: board })
        .select("-delete_password -reported")
        .sort({bumped_on: -1})
        .limit(10)

        const norbData = boardData.map(e => {
          e.replies = e.replies.slice(0,4)
          return e
        })

      res.json(norbData)
  })

    .post(async (req, res) => {
      let board;
      req.params.board 
        ? board = req.params.board
        : board = req.body.board

      const { text, delete_password } = req.body
      
      const thread = await Thread.create({
        board: board,
        text: text,
        delete_password: delete_password,
        created_on: new Date(Date.now()),
        bumped_on: new Date(Date.now()),
      })

      res.redirect(`/b/${board}/`)
  })

    .put(async (req, res) => {
      const data = await Thread.findOne({_id: req.body._report_id})
      if(!data) return res.json({error: 'something went wrong'})
      data.reported = true;
      await data.save()
      return res.send("reported")
      
    })

    .delete(async (req, res) => {
      const { thread_id, delete_password } = req.body 
      const deletedThread = await Thread.deleteOne({
      _id: thread_id,
      delete_password: delete_password
    })
    if (deletedThread.deletedCount == 1) {
      const deletedreplies =  await Reply.deleteMany({thread_id: thread_id})
      res.send("success")
    }
    else {
      res.send("incorrect password")
    }
    })

    
    
    
  app.route('/api/replies/:board')
    
    .get(async (req, res) => {
      const { thread_id } = req.query
      const data = await Thread.findOne({_id: thread_id}).select("-reported -delete_password")

      res.json(data)
    })

    .post(async (req, res) => {
      const { thread_id, text, delete_password} = req.body
      const thread = await Thread.findOne({_id: thread_id})
      const newDate = new Date(Date.now())

      const reply = await Reply.create({thread_id: thread_id, text: text, delete_password: delete_password, created_on: newDate, reported: false})
      await reply.save()

      thread.replies.push(reply)
      thread.replycount = thread.replies.length
      thread.bumped_on = newDate

      await thread.save()
      res.redirect(`/b/${thread.board}/${thread_id}`)
    })

    .put(async (req, res) => {
      const { thread_id, reply_id } = req.body;
      const foundReply = await Reply.findOne({_id: reply_id, thread_id: thread_id});
      if(!foundReply) res.send('something went wrong')
      foundReply.reported = true;
      await foundReply.save();
      return res.send('reported')
    })

    .delete(async (req, res) => {
      const {thread_id, reply_id, delete_password} = req.body

      const replyData = await Reply.findOne({_id: reply_id, delete_password: delete_password})

      if(!replyData) return res.send('incorrect password')
      replyData.text = '[deleted]';
      await replyData.save();

      const threadData = await Thread.updateOne(
        {_id: thread_id, 'replies._id': reply_id },
        { $set: { 'replies.$.text': '[deleted]'}}
      )
      if(threadData.matchedCount != 1) return res.send('something went horribly wrong')
      return res.send('success')
      

})};
