var mongoose     = require('mongoose');
var threadSchema = require('./Schema').threadSchema;


var ThreadsModel = mongoose.model('Threads', threadSchema);

var getThreadsModel = function (collection) {
  return mongoose.model('Threads', threadSchema, collection)
}

module.exports = getThreadsModel
