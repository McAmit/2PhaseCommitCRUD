const { model } = require("mongoose");
const db = require("../models");
const primary_model = db.model
const replica_model = db.model2
const fs = require('fs')

// Maps to control the changes of Id's between replica and primary
var pToRMap = null
var rToPMap = null

function readMaps()  {
  fs.readFile('./pToRMap.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    pToRMap = new Map(Object.entries(JSON.parse(data)))
    console.log(pToRMap)
  });
  fs.readFile('./rToPMap.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    rToPMap = new Map(Object.entries(JSON.parse(data)))
    console.log(rToPMap)
  });
}

function writeMaps() {
  let pToRObject = Object.fromEntries(pToRMap)
  let rToPObject = Object.fromEntries(rToPMap)

  fs.writeFile("./pToRMap.txt", JSON.stringify(pToRObject), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  })
  fs.writeFile("./rToPMap.txt", JSON.stringify(rToPObject), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  })
}
function updateMaps(idP, idR) {
  console.log("Maps Updated")
  pToRMap.set(idP, idR)
  rToPMap.set(idR, idP)
  writeMaps()
}
function clearMaps() {
  pToRMap.clear()
  rToPMap.clear()
  writeMaps()
}
function deleteFromMaps(idP, idR) {
  pToRMap.delete(idP)
  rToPMap.delete(idR)
  writeMaps()
}

readMaps() // Init Maps from files

// Create and Save a new MONDEL 
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a primary Mondel
  var mondel = new primary_model({
    name: req.body.name,
    age: req.body.age,
    food: req.body.food
  })
  var mondel2 = new replica_model({
    name: req.body.name,
    age: req.body.age,
    food: req.body.food
  })
  // Save Mondel in the database
  mondel.$__save({}, function (e) {
    if (e) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    } else {
      mondel2.$__save({}, function (err) {
        if (e) {
          primary_model.findByIdAndDelete(req.params.id).then(data => {
            if (!data)
              res.status(500).send({
                message: "Rollback Failed!"
              })
            else {
              res.send({
                message:
                  "Rollback Applied"
              })
            }
          })
          res.status(500).send({
            message:
              "Some error occurred while duplicating the Mondel, Rollback Applied"
          })
        } else {
          updateMaps(mondel.id, mondel2.id)
          console.log("Saved to 2nd DB")
        }
      })
      res.send(mondel)
    }
  })
};
// Retrieve all mondel from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  primary_model.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single mondel with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  primary_model.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Mondel with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Mondel with id=" + id });
    });
};
// Update a mondel by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const idP = req.params.id;
  let idR = pToRMap.get(idP)

  let old_mondel = null
  primary_model.findById(idP).then(data => { old_mondel = new primary_model(data) })

  primary_model.findByIdAndUpdate(idP, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Mondel with id=${id}. Maybe Mondel was not found!`
        })
      } else {
        replica_model.findByIdAndUpdate(idR, req.body, { useFindAndModify: false })
          .then(dat => {
            if (!dat) {
              primary_model.findByIdAndUpdate(idP, old_mondel, { useFindAndModify: false })
                .then(() => { res.send({ message: "Didnt update, Rolled Back" }) })
            } else {
              res.send({ message: "Mondel was updated successfully." })
            }
          })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Mondel with id=" + id
      });
    });

};
// Delete a mondel with the specified id in the request
exports.delete = (req, res) => {

  const idP = req.params.id;
  let idR = pToRMap.get(idP)

  let removed_mondel = null
  primary_model.findById(idP).then(data => {
    removed_mondel = new primary_model({
      name: data.name,
      age: data.age,
      food: data.food
    })
  })
  primary_model.findByIdAndDelete(idP)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Mondel with id=${id}. Maybe Mondel was not found!`
        });
      } else {
        replica_model.findByIdAndDelete(idR).then(dat => {
          if (!dat) {
            removed_mondel.$__save({}, function (errora) {
              if (errora) {
                console.log(errora)
              } else {
                deleteFromMaps(idP, idR)
                updateMaps(removed_mondel.id, idR)
                res.send({
                  message: "Rollback Applied on Deletation!"
                })
              }
            })
          } else {
            deleteFromMaps(idP,idR)
            res.send({
              message: "Mondel was deleted successfully!"
            });
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Mondel with id=" + id
      });
    });
};
// Delete all mondel from the database.
exports.deleteAll = (req, res) => {
  last_model = primary_model
  primary_model.deleteMany({})
    .then(data => {
      replica_model.deleteMany({}).then(dat => { }).catch(err => { })
      res.send({
        message: `${data.deletedCount} Mondels were deleted successfully!`
      });
      clearMaps()
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all mondels."
      });
    });
};
