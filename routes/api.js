/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var   expect           = require('chai').expect;
var   ThreadController = require('../controllers/ThreadController');
var   ReplyController  = require('../controllers/ReplyController');
var   BoardController = require('../controllers/BoardController');

var mongoose = require('mongoose');

module.exports = function (app) {

  var threadController = new ThreadController();
  var replyController = new ReplyController();
  var boardController = new BoardController();

  app.route('/api/boards')
    .get(boardController.listBoards)

  app.route('/api/threads/:board')
    .post(threadController.postThread)
    .get(threadController.listThreads)
    .put(threadController.reportThread)
    .delete(threadController.deleteThread)

  app.route('/api/replies/:board')
    .post(replyController.postReply)
    .get(replyController.listReplies)
    .put(replyController.reportReply)
    .delete(replyController.deleteReply)

};
