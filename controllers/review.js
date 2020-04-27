
const mongoose = require("mongoose");
const TourModel = require("../models/tour");
const ReviewModel = require("../models/review")

exports.getReviews = async (req, res, next) => {
    //1. check req.query.tourId exist or not? if not, res with an error
    //2. fetch tour document from database using req.query.tourId, populate reviews 
    // return just the revies to the users
    try {
        if (!req.query.tourId) {
            return res.status(400).json({ status: "fail", message: "missing tourId query string parameter" })
        }
        const tour = await TourModel.findById(req.query.tourId).populate("reviewIds").exec();
        if (!tour) {
            return res.status(404).json({ status: "fail", message: "tour is not exist" })
        }
        res.status(200).json({ status: "ok", reviews: tour.reviewIds })
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message })
    }
};

exports.createReview = async (req, res, next) => {
    try {
        let tour = await TourModel.findById(req.query.tourId).exec();
        const review = new ReviewModel({
            creatorId: req.token.userId,
            content: req.body.content
        })
        const result = await review.save();
        tour.reviewIds.push(result._id);
        await tour.save();
        res.status(200).json({ status: "ok", review: result })
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message })
    }
};

exports.editReview = async (req, res, next) => {
    // 1. find the review Id with params
    //2. check if creatorId = req.token.userId or not
    // if yes, let user edit content
    // if not, error: 401: unthenticate user
    try {
        const review = await ReviewModel.findById(req.params.reviewId).exec();
        if (!review) {
            // just incase some one deleted resource before user reload the page
            return res.status(404).json({ status: "fail", message: "can't find the review" })
        }
        if (review.creatorId.toString() === req.token.userId) {
            review.content = req.body.content;
            const result = await review.save();
            res.status(200).json({ status: "ok", review: result })
        } else {
            return res.status(403).json({ status: "fail", message: "forbbiden edit" })
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}