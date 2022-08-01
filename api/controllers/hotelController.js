const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      hotel,
    },
  });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedHotel) {
    return next(new AppError("Not any hotel found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedHotel,
    },
  });
});

exports.deleteHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);

  if (!hotel) {
    return next(new AppError("Not any hotel found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Hotel has been deleted.",
  });
});

exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(new AppError("Not any hotel found with this id", 404));
  }

  res.status(200).json(hotel);
});

exports.getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 1500 },
    }).limit(req.query.limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.countByCity = catchAsync(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  console.log(cities);

  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );

  res.status(200).json(list);
});

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
