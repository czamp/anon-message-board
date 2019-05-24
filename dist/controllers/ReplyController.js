const getRepliesModel = require("../models/RepliesModel");
const getThreadsModel = require('../models/ThreadsModel');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongo = require('mongodb');
var ObjectID = require("mongodb").ObjectID;

function RepliesController() {

  this.postReply = function(req, res) {
    var board = req.params.board;

    var ReplyModel = getRepliesModel(board);
    var ThreadModel = getThreadsModel(board);

    var reply = new ReplyModel({
      text: req.body.text,
      created_on: new Date(),
      delete_password: bcrypt.hashSync(req.body.delete_password, 12),
      thread_id: req.body.thread_id,
      reported: false
    });

    ThreadModel.findOneAndUpdate(
      {_id: new ObjectID(req.body.thread_id)},
      {bumped_on: new Date(), $addToSet: {replies: reply}},
      (err, doc) => {
        if (err) console.log(err);
        res.redirect('/b/' + board + '/');
      }
    )
  }

  this.listReplies = function(req, res) {
    var board = req.params.board;

    var ThreadModel = getThreadsModel(board);

    ThreadModel.find(
      {_id: new ObjectID(req.query.thread_id)},
      {reported: 0, delete_password: 0, "replies.reported": 0, "replies.delete_password": 0},
      (err, doc) => {
        if (err) console.log(err);
        res.json(doc[0]);
      }
    )
  }

//   this.listReplies = function(req, res) {
//     var board = req.params.board;

//     var ThreadModel = getThreadsModel(board);

//     ThreadModel
//       .find({_id: new ObjectID(req.query.thread_id)})
//       .select()
//   }

  this.reportReply = function(req, res) {
    var board = req.params.board;
    var ThreadModel = getThreadsModel(board);

    ThreadModel.findOneAndUpdate(
      {_id: new ObjectID(req.body.thread_id), "replies._id": new ObjectID(req.body.reply_id)},
      {$set: {"replies.$.reported": true}},
      (err, doc) => {
        if (err) console.log(err);
        res.send('success')
      }
    )
  }

  this.deleteReply = function(req, res) {
    var board = req.params.board;
    var ThreadModel = getThreadsModel(board);
    var threadID = req.body.thread_id
    var replyID = req.body.reply_id;
    var pass = req.body.delete_password;

    ThreadModel.findOneAndUpdate({_id: threadID, replies: {$elemMatch: {_id: replyID}}},{}, (err, doc) => {
      var reply = doc.replies.id(replyID)
      if (bcrypt.compareSync(pass, reply.delete_password)) {
        // console.log("Hash Match")
        reply.text = '[deleted]'
        doc.save((err, doc) => {
          if (err) console.log(err);
          res.send('success')
        })
      } else {
        // console.log("Incorrect Password")
        res.send('incorrect password')
      }

    })
  }

}

module.exports = RepliesController;
