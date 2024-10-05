const { mongoose, connect } = require("mongoose");
require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoUrl, {
      dbName: "Ecommerce",
    });
    console.log("Database connectivity hell yaa");
  } catch (error) {
    console.log(error);
  }
};
// hello db connection

module.exports = {
  connectDB,
};
