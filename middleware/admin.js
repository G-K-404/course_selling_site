const jwt = require("jsonwebtoken");
const {JWT_SECRET_admin} = require("../config");

function adminmiddleware(req, res, next){
    let token = req.headers.token;
    let decoded = jwt.verify(token, JWT_SECRET_admin);
    if(decoded){
        req.adminid = decoded._id;
        next();
    }else{
        res.status(403).send(json({message: "You are not signed in"}));
    }
}

module.exports = {
    adminmiddleware:adminmiddleware
}