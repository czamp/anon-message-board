'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

var helmet = require('helmet');
var mongoose = require('mongoose');
// require('dotenv').config();

var app = express();

app.use(helmet({
  frameguard: { action: 'deny' },
  dnsPrefetchControl: true,
  referrerPolicy: { policy: 'same-origin' }
}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false}, function(err, client) {
    if (err) { console.log('Error connecting to database: ' + err) }
    else { console.log('Connected to database.');}

  });

app.use('/static', express.static(process.cwd() + '/app/static'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/app/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//Sample Front-end


//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
