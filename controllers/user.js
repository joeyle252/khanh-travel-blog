
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

// POST/USER
exports.createUser = async (req,res)=>{
    try{
        const user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });
        await user.save();
        const result = user.getPublicFields();
        res.json(result);
    }catch(err){
        res.status(400).json({status:"fail", message: err.message});
    }
};

// put/user
exports.updateUser = async(req,res)=>{
    try{
        const user = await UserModel.findOne({_id:req.params.userId}).exec();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        const result = user.getPublicFields();
        res.json(result);
    }catch(err){
        res.status(400).json({status:"fail", message: err.message});
    }
};

// post/login
exports.authenticateUser = async (req,res,next)=>{
    try {
        const query = {username: req.body.username};
        const user = await UserModel.findOne(query).exec();
        if(!user){
            res.status(401).json({status:"fail", message: "couldn't find user"});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            res.status(401).json({status:"fail", message: "wrong password"});
        }
        const token = jwt.sign({username: user.username, userId: user._id}, process.env.JWT_SECRET);
        res.status(200).json({token:token, username:user.username, userId: user._id});
    }catch(err){
        res.status(400).json({status:"fail",message: err.message});
    }
};

