
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema ({
    //user will have username, password and email
    username:{
        type: String,
        unique: true,
        trim: true,
        required: [true, "missing userName"],
        minlength: [3,"need at least 3 characters"],
        maxlength: [20,"maximum 12 characters allowed"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "missing password"],
        minlength: [3, "need at least 3 characters"],
        maxlength: [20, "maximum 20 characters allowed"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "missing email"],
    },
});

userSchema.pre("save", async function (next){
    //just hash password if it has been modified or it new
    if(!this.isModified("password")) return next();
    try{
        const saltRounds = 10;
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;

    }catch(err){
        return next(err)
    }
});

userSchema.methods.getPublicFields = function (){
    //just show username, email and ID at client side
    const obj = {
        username: this.username,
        _id: this._id,
        email: this.email,
    };
    return obj;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;