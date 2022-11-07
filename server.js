const express = require('express');
// const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/config');
const { Client: Client7 } = require('es7');
const config = require('./config/config');
// const helmet = require('helmet');
const morgan = require('morgan');
// const compression = require('compression');
const cors = require('cors');
//Imported Routes
const esroutes = require('./routes/api/es');
const fserver = require('./routes/api/fileserver');

// app.disable('x-powered-by');
// const esconfig = require("./config/esConfig");
// app.disable('x-powered-by');
// app.use(function (req, res, next) {
//   // Switch off the default 'X-Powered-By: Express' header
//   app.disable('x-powered-by');

//   // OR set your own header here
//   res.setHeader('X-Powered-By', 'Vidhan Docs API Ver 1.4 :-)');

//   // .. other headers here

//   next();
// });

// app.disable('x-powered-by');

const app = express();
// Using Helmet JS
// app.use(helmet());
//app.use(compression());
// Using Logger

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('tiny'));
}

// Body Parser Middleware
app.use(express.json({ extended: false }));
// app.use(
//   "/pdf",
//   express.static("/home/vaibhav/Documents/VidhanDocsTracker/public/debates")
// );

// Config
const {
  es_pass,
  es_user,
  es_host_remote,
  kla_test_index,
  klc_test_index,
  publicDirLocal,
  publicDirServer,
} = config;

// Implement Global promise for Mongoose
mongoose.Promise = global.Promise;

//DB Config
//Check if the APP Variable connects to KLA or KLC
if (keys.CUSTOMER === 'KLA') {
  var db = keys.localMongoURI_KLA_EXP;
} else {
  var db = keys.localMongoURI_KLC_EXP;
}
// const db = keys.mongoatlas;
console.log(db);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// // ElasticSearch
// console.log(
//   `Attempting Connection with ES https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port} `
// );
let nodePath = `https://${es_user}:${es_pass}@${es_host_remote}`;
if (process.env.NODE_ENV === 'production') {
  // nodePath = `http://localhost:5000`;
}

console.log('The Node Path is set to --> ', nodePath);

const client = new Client7({
  //   node: `https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port}`,
  node: nodePath,
  //"https://elastic:pQoXAqllveTLKzaPvv9NVYnO@enterprise-search-deployment-2bf868.es.us-west1.gcp.cloud.es.io:9243",
});

// Routing
//app.get("/", (req, res) => res.send("Hello Vidhan DocsTracker Explorer!!!"));
// CORS
app.use(cors());
//Use routes
app.use('/api/sd/', esroutes); // for all the routes routing to search database
app.use('/api/fs/', fserver); // For serving static files
app.disable('x-powered-by');
// console.log(app);
//router.get("/test", (req, res) => res.json({ msg: "File Server Test " }));

// Serve React Files

if (process.env.NODE_ENV === 'production') {
  // https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
  // https://stackoverflow.com/questions/53551717/couldnt-find-that-app-when-running-heroku-commands-in-console
  // https://blog.bitsrc.io/react-production-deployment-part-3-heroku-316319744885
  // https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  // app.disable('x-powered-by');
}

client.ping({}, function (error) {
  if (error) {
    console.log('ES Cluster is down', error);
  } else {
    console.log('ES Cluster is up!');
  }
});

if (keys.CUSTOMER === 'KLA') {
  var port = process.env.PORT || 9200;
} else {
  var port = process.env.PORT || 9101;
}

app.listen(port, () => console.log(`Server running on port ${port}`));
