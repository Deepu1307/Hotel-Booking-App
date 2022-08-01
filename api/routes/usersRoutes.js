const express = require("express");
const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(AuthController.protect, AuthController.restrictTo("admin"));

//GET ALL
router.get("/", UserController.getUsers);

//GET
router.get("/:id", UserController.getUser);

//UPDATE
router.put("/:id", UserController.updateUser);

//DELETE
router.delete("/:id", UserController.deleteUser);

module.exports = router;
