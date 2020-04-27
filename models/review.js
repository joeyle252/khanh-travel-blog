
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, " you need to leave a review"]
    }
})

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;