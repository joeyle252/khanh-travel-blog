
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
    minlength: [5, "Description need at least 5 characters"],
    maxlength: [500, "Description maximum lenght is 500 characters"],
  },
  reviewIds: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
},
  {
    timestamp: true
  }
);

tourSchema.methods.getPublicFields = function () {
  const obj = {
    _id: this._id,
    name: this.name,
    creatorId: this.creatorId,
    description: this.description,
  };
  return obj;
};

const TourModel = mongoose.model("Tour", tourSchema);

module.exports = TourModel;