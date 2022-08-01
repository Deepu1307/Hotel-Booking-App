const express = require("express");
const RoomController = require("../controllers/roomController");
const AuthController = require("../controllers/authController");

const router = express.Router();

//CREATE
router.post(
  "/:hotelid",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  RoomController.createRoom
);

//UPDATE
router.put("/availability/:id", RoomController.updateRoomAvailability);

router.put(
  "/:id",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  RoomController.updateRoom
);

//DELETE
router.delete(
  "/:id/:hotelid",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  RoomController.deleteRoom
);
//GET

router.get("/:id", RoomController.getRoom);
//GET ALL

router.get("/", RoomController.getRooms);

module.exports = router;
