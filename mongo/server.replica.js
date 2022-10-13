const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const ex = require("./ex");

const app = express();
var corsOptions = {

  origin: "http://localhost:3001"

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
  db.mongoose2
  .connect(db.url2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the Replica database!");
  })
  .catch(err => {
    console.log("Cannot connect to the Replica database!", err);
    process.exit();
  });
// simple route

app.get("/", (req, res) => {

  res.json({ message: ex.init});

});

// set port, listen for requests

require("./app/routes/mondel.routes")(app);

const PORT = process.env.PORT+2 || 8082;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});