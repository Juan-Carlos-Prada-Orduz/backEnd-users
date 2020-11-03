const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");

router.get("/api/v1", (request, response) => {
  response.send("Api AgroTech");
});

/**
 * ENDPOINTS
 */

router
  .get("/api/v1/users", userController.getUsers)
  .post("/api/v1/users", userController.saveUser)
  .put("/api/v1/users/:id", userController.updateUser)
  .delete("/api/v1/users/:id", userController.deleteUser)

module.exports = router;