const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/sorted", userController.getUsersSorted);
router.get("/age/:age", userController.getUsersFilteredAge);
router.get("/domain/:domain", userController.getUsersFilteredDomain);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
