var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
  text:             { type: String, required: true },
  created_on:       { type: Date,   required: true },
  reported:         { type: Boolean,   required: true, default: false },
  delete_password:  { type: String, required: true },
  thread_id:        { type: String , required: true }
})

var threadSchema = new Schema({
  text:             { type: String,   required: true },
  created_on:       { type: Date,     required: true },
  bumped_on:        { type: Date,     required: true },
  reported:         { type: Boolean,  required: true, default: false },
  delete_password:  { type: String,   required: true },
  replies:          { type: [replySchema] },
  replycount:       { type: Number }
})

module.exports = {
  threadSchema: threadSchema,
  replySchema: replySchema
}

// module.exports = {
//   getThreadSchema: async function (collection) {
//     return await mongoose.model('Threads', threadSchema, collection)
//   },
//   getReplySchema: async function (collection) {
//     return await mongoose.model('Replies', replySchema, collection)
//   }
// }
