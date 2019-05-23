const getThreadsModel = require("../models/ThreadsModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongo = require('mongodb');

function ThreadController() {
  this.postThread = function(req, res) {
    var board = req.params.board;

    var ThreadModel = getThreadsModel(board);

    var thread = new ThreadModel({
      text: req.body.text,
      created_on: new Date(),
      bumped_on: new Date(),
      reported: false,
      delete_password: bcrypt.hashSync(req.body.delete_password, 12),
      replies: []
    });

    thread.save((err, doc) => {
      if (err) console.log(err);
      // res.redirect("/b/" + board + "/");
      res.send(doc._id)
    });
  };

  this.listThreads = function(req, res) {
    var board = req.params.board;
    var Threads = getThreadsModel(board);

    Threads
      .find({})
      .limit(10)
      .select('-delete_password -reported -replies.reported -replies.delete_password')
      .sort('-bumped_on')
      .exec((err, docs) => {
        if (err) console.log(err);
        docs.forEach(function(doc) {
          doc.replycount = doc.replies.length;
          if (doc.replies.length > 3) {
            doc.replies = doc.replies.slice(-3)
          }
        })
      res.json(docs)
      })
  }

  this.reportThread = function(req, res) {
    var board = req.params.board;
    var Threads = getThreadsModel(board);

    Threads.findOneAndUpdate({_id: req.body.thread_id}, {reported: true}, (err, doc) => {
      if (err) console.log(err);
      res.send('success');
    })
  }

  this.deleteThread = function(req, res) {
    var board = req.params.board;
    var Threads = getThreadsModel(board);

    Threads.findOneAndUpdate({_id: req.body.thread_id}, {}, (err, doc) => {
      if (bcrypt.compareSync(req.body.delete_password, doc.delete_password)) {
        doc.remove();
        res.send('success');
      } else {
        res.send('incorrect password')
      }
    })
  }

}

module.exports = ThreadController;
