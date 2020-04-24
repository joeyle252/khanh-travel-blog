
const TourModel = require("../models/tour")

exports.getTours = async (req, res, next) => {
    const tours = await TourModel.find().exec();
    return res.status(200).json({ tours: tours })
}