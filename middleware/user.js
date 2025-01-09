const jwt = require("jsonwebtoken");
const {JWT_SECRET_admin} = require("../config");

function usermiddleware(req, res, next){
    let token = req.headers.token;
    let decoded = jwt.verify(token, JWT_SECRET_admin);
    if(decoded){
        req.userid = decodedid;
        next();
    }else{
        res.status(403).send(json({message: "You are not signed in"}));
    }
}

module.exports = {
    usermiddleware:usermiddleware
}