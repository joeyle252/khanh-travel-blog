
const mongoose = require("mongoose");
const CategoryModel = require("./models/category");


exports.setupDevEnvironmentVariables = ()=>{
    const nodeEnvironment = process.env.NODE_ENV;
    if(nodeEnvironment !== "production"){
        require("dotenv").config();
    }
};

exports.connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on("error", (err) => {
      console.error(err);
      console.log("MongoDB connection error. Please make sure MongoDB is running.");
      process.exit();
    });
    mongoose.connection.once("open", async () => {
      console.log("Successfully connected to mongoDB");
    });
  };