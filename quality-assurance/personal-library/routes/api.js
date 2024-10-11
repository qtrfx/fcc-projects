"use strict";
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: [String],
  commentcount: { type: Number, default: 0 },
});
const Books = mongoose.model("Books", bookSchema);

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      Books.find({}).then((data) => {
        res.json(data);
      });
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function (req, res) {
      let title = req.body.title;
      if (!title) return res.json("missing required field title");
      Books.create({ title: title }).then((data) => {
        res.json(data);
      });
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      Books.deleteMany({}, (err, data) => {
        if (err) return console.error(err);
        return res.json("complete delete successful");
      });
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      Books.findById(bookid)
        .select("-commentcount")
        .exec((err, data) => {
          if (!data) return res.json("no book exists");
          res.json(data);
        });
    })
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.json("missing required field comment");
      Books.findOneAndUpdate(
        { _id: bookid },
        { $push: { comments: comment }, $inc: { __v: 1, commentcount: 1 } },
        { new: true },
        (err, data) => {
          if (!data) return res.json("no book exists");
          res.json(data);
        }
      );
    })
    //json res format same as .get

    .delete(function (req, res) {
      let bookid = req.params.id;
      if (!(bookid.length == 24 || bookid.length == 12))
        return res.json("no book exists");
      Books.deleteOne({ _id: bookid }, (err, data) => {
        if (err) return console.error(err);
        if (data.deletedCount != 1) return res.json("no book exists");
        return res.json("delete successful");
      });
      //if successful response will be 'delete successful'
    });
};
