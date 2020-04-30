
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, " need a name for category"],
        minlength:[5, "please add at least 5 characters"],
        maxlength: [20, "maximum 20 characters"]
    }
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;


