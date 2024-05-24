const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const uri =
    "mongodb+srv://yaroslavugnivenko16:3bv1vamcd99MRZWZ@cluster0.rjgqulz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(uri);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    console.log("Could not connect to database!");
  }
};

module.exports = connectToDatabase;
