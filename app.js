
const {setupDevEnviromentVariables, connectDb} = require("./setup");
setupDevEnviromentVariables();
const express = requires("express");


const app = express();

//connect mongoDb
connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

//routes


module.exports = app;
