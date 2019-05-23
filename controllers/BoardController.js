var mongoose = require('mongoose');

function BoardController() {
  this.listBoards = function (req, res) {
    mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (err) console.log(err);
      var boardNames = names.map(n => n.name);
      res.json(boardNames)
    })
  }
}

module.exports = BoardController;
