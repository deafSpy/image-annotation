const mongoose = require("mongoose");
const configKeys = require("../constants");
const colors = require('colors');

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(configKeys.MONGO_URI, {
      dbName: configKeys.MONGO_DBNAME,
    });
    console.log('Database connected successfully'.magenta);
  } catch (error) {
    console.log("Failed to connect to MongoDB".red, error);
    process.exit(1);
  }
};

module.exports = connectDB;
