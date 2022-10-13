const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const ex = require("./ex");

const app = express();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

var corsOptions = {

  origin: "http://localhost:3000"

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");

// simple route
if(db.conn.readyState === 0 ){
  console.log("Primary Database not connected!", err)
} else if(db.conn.readyState === 2){
  db.conn.on('open', ()=>{
    if(db.conn.readyState === 1)
      console.log("Connected to the Primary database!")
  })
}

if(db.conn2.readyState === 0 ){
  console.log("Secondary Database not connected!", err)
} else if(db.conn.readyState === 2){
  db.conn2.on('open' , ()=>{
    if(db.conn.readyState === 1)
    console.log("Connected to the Secondary database!")
  })
}


app.get("/", (req, res) => {

  res.json({ message: ex.init});

});

// set port, listen for requests

require("./app/routes/mondel.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);
  
});