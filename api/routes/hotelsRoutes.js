const express = require("express");
const HotelController = require("../controllers/hotelController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HotelController.createHotel
);
router.put(
  "/:id",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HotelController.updateHotel
);
router.delete(
  "/:id",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HotelController.deleteHotel
);

router.get("/find/:id", HotelController.getHotel);

router.get("/", HotelController.getHotels);

router.get("/countByCity", HotelController.countByCity);
router.get("/countByType", HotelController.countByType);

module.exports = router;
