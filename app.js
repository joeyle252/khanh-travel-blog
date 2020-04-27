
const { setupDevEnvironmentVariables, connectDb } = require("./setup");
setupDevEnvironmentVariables();
const express = require("express");
const { createUser, updateUser, authenticateUser } = require("./controllers/user");
const { checkJwt } = require("./middleware/auth");
const { getTours, createTour, updateTour, deleteTour } = require("./controllers/tour");
const { getReviews, createReview, editReview, deleteReview } = require("./controllers/review");
const ReviewModel = require("./models/review");


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
router.put("/tour/:tourId", checkJwt, updateTour);
router.delete("/tour/:tourId", checkJwt, deleteTour);

router.get("/reviews", getReviews);
router.post("/review", checkJwt, createReview);
router.put("/review/:reviewId", checkJwt, editReview);
router.delete("/review/:reviewId", checkJwt, deleteReview);




app.use(router);

module.exports = app;
