
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, " you need to leave a review"]
    },
    creatorId: {
        required: [true, "need a creatorId"],
        trim: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;