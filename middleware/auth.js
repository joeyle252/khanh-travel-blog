
const jwt = require("express-jwt");


exports.checkJwt = jwt({ secret: process.env.JWT_SECRET, requestProperty: "token"})