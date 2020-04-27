
const TourModel = require("../models/tour");

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

}