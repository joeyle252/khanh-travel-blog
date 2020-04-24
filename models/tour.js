
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: [5, "Name need at least 5 characters"],
    maxlength: [20, "Name maximum 20 charcters"]
  },
  creatorId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, "Description need at least 10 characters"],
    maxlength: [500, "Description maximum lenght is 500 characters"],
  },
},
  {
    timestamp: true
  }
)

const TourModel = mongoose.model("Tour", tourSchema);

module.exports = TourModel;