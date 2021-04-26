const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const keys = require("./config/config");
const { Client: Client7 } = require("es7");
const config = require("./config/config");
//Imported Routes
const esroutes = require("./routes/api/es");
const fserver = require("./routes/api/fileserver");

const app = express();
// const esconfig = require("./config/esConfig");

// Body Parser Middleware
app.use(express.json({ extended: false }));

// Implement Global promise for Mongoose
mongoose.Promise = global.Promise;

//DB Config
//Check if the APP Variable connects to KLA or KLC
if (keys.CUSTOMER === "KLA") {
  var db = keys.localMongoURI_KLA_EXP;
} else {
  var db = keys.localMongoURI_KLC_EXP;
}
// const db = keys.mongoatlas;
console.log(db);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// // ElasticSearch
// console.log(
//   `Attempting Connection with ES https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port} `
// );
const client = new Client7({
  //   node: `https://${config.es_user}:${config.es_pass}@${config.es_host}:${config.es_port}`,
  node:
    "https://elastic:pQoXAqllveTLKzaPvv9NVYnO@enterprise-search-deployment-2bf868.es.us-west1.gcp.cloud.es.io:9243",
  //https://283e4281e6fc4d77bb892cff3e77f8ec.us-west1.gcp.cloud.es.io:9243
});

// Routing
app.get("/", (req, res) => res.send("Hello Vidhan DocsTracker Explorer!!!"));

//Use routes
app.use("/api/sd/", esroutes); // for all the routes routing to search database
app.use("/api/fs/", fserver); // For serving static files

// Serve React Files

if (process.env.NODE_ENV === "production") {
  // https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
  // https://stackoverflow.com/questions/53551717/couldnt-find-that-app-when-running-heroku-commands-in-console
  // https://blog.bitsrc.io/react-production-deployment-part-3-heroku-316319744885
  // https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

client.ping({}, function (error) {
  if (error) {
    console.log("ES Cluster is down", error);
  } else {
    console.log("ES Cluster is up!");
  }
});

if (keys.CUSTOMER === "KLA") {
  var port = process.env.PORT || 9201;
} else {
  var port = process.env.PORT || 9101;
}

app.listen(port, () => console.log(`Server running on port ${port}`));
