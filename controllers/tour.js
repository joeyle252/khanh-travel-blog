
const TourModel = require("../models/tour")

exports.getTours = async (req, res, next) => {
    const tours = await TourModel.find().exec();
    return res.status(200).json({ tours: tours })
};

exports.createTour = async (req,res,next)=>{
    try{
        const tour = new TourModel({
            name: req.body.name,
            creatorId: req.user.userId,
            description: req.body.description,
        })
        await tour.save();
        res.json(tour);
    } catch (err){
        res.status(400).json({status: "fail", message: err.message})
    }
}