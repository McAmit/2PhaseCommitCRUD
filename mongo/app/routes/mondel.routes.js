module.exports = app => {
    const mondels = require("../controllers/CRUD.controller.js");
    var router = require("express").Router();
    // Create a new mondel
    router.post("/", mondels.create);
    // Retrieve all mondels
    router.get("/", mondels.findAll);
    // Retrieve a single mondel with id
    router.get("/:id", mondels.findOne);
    // Update a mondel with id
    router.put("/:id", mondels.update);
    // Delete a mondel with id
    router.delete("/:id", mondels.delete);
    // Create a new mondel
    router.delete("/", mondels.deleteAll);
    app.use('/api/mondels', router);
  };