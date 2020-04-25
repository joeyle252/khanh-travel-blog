
const { setupDevEnvironmentVariables, connectDb } = require("./setup");
setupDevEnvironmentVariables();
const express = require("express");
const { createUser, updateUser, authenticateUser } = require("./controllers/user");
const { checkJwt } = require("./middleware/auth");
const { getTours, createTour } = require("./controllers/tour");


const app = express();

//connect mongoDb
connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const router = express.Router();

router.post("/user", createUser);
router.put("/user/:userId", checkJwt, updateUser); // we add protection, just incase data was deleted by un-authentication

router.post("/login", authenticateUser);

router.get("/tours", getTours);
router.post("/tour", checkJwt, createTour);
app.use(router);



module.exports = app;
