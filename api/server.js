const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🔥 SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

// Always write dotenv configuration first then import app.js
dotenv.config();
const app = require("./app.js");
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to mongoDB 🎆🎆");
  } catch (error) {
    throw error;
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected 😭😭");
});

const server = app.listen(process.env.PORT, () => {
  connect();
  console.log(`Connected to backend 💓💓`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🔥 SHUTTING DOWN");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
