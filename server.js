// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['Access-Token'],
};
app.use(cors(corsOption));

const auth = require('./auth');

// parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/auth', auth);

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./routes')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// default route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to photos sharing App"});
});

// listen on port 3000
app.listen(config.serverport, () => {
  console.log("Server is listening on port 3000");
});