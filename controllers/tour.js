
const TourModel = require("../models/tour")

exports.getTours = async (req, res, next) => {
    let query = {};
    if (req.query.userId) {
        query = { creatorId: req.query.userId }
    }
    const tours = await TourModel.find(query).exec();
    return res.status(200).json({ tours: tours })
};

exports.createTour = async (req, res, next) => {
    try {
        const tour = new TourModel({
            name: req.body.name,
            creatorId: req.token.userId, // req.user.userId
            description: req.body.description,
        })
        await tour.save();
        res.json(tour);
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message })
    }
};

exports.updateTour = async (req, res, next) => {
    try {
        // 1. using the tour Id from the url parameters (req.params.tourId), we get tour document from the database
        const tour = await TourModel.findById(req.params.tourId).exec();
        // 2. check the creatorID on the tour document matchs the userId in the token, if yes then let them update, if not 403
        if (tour.creatorId.toString() === req.token.userId) {
            //name + desciption
            tour.name = req.body.name;
            tour.description = req.body.description;
            await tour.save();
            const result = tour.getPublicFields();
            res.json(result);
        } else {
            res.status(403).json({ status: "fail", message: "You are not allow to update this tour" })
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message })
    }
};

exports.deleteTour = async (req, res, next) => {
    try {
        // the logis is the same with update tour
        const tour = await TourModel.findById(req.params.tourId).exec();
        if (tour.creatorId.toString() === req.token.userId) {
            //let them delete 
            const query = { _id: req.params.tourId };
            await TourModel.findOneAndDelete(query).exec();
            res.status(200).json({ status: "ok", mesaage: "successfully delete tour" });
        } else {
            res.status(403).json({ ststus: "fail", message: "you are forbbiden to delete this tour" });
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}