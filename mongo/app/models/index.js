const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

var schema = mongoose.Schema(
    {
      name: String,
      age: String,
      food: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

var conn = mongoose.createConnection('mongodb://localhost:27017/db1')
var conn2 = mongoose.createConnection('mongodb://localhost:27017/db2')
model = conn.model('mondel', schema)
model2 = conn2.model('mondel', schema)

const db = {};
db.mongoose = mongoose;
db.conn = conn
db.conn2 = conn2
db.mongooseModel = require("../controllers/mongoose.model.js")(mongoose);
db.model = model
db.model2 = model2
module.exports = db;
