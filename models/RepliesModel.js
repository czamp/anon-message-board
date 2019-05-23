var mongoose     = require('mongoose');
var replySchema = require('./Schema').replySchema;

var RepliesModel = mongoose.model('Replies', replySchema);

var getRepliesModel = function(collection) {
  return mongoose.model('Replies', replySchema, collection)
}

module.exports = getRepliesModel;
